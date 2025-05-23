import { movesImagesDataset } from '@/assets/datasets/movesImageDataset';
import { DraggableMoveCard, MoveItem } from '@/components/DraggableMoveCard';
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { PlusButton } from '@/components/PlusButton';
import { ThemedView } from '@/components/ThemedView';
import { ComboQueryResponse, MoveFromComboQueryResponse } from '@/src/api/combos';
import { useComboQuery } from '@/src/hooks/useComboQuery';
import { useComboUpdateMutation } from '@/src/hooks/useComboUpdateMutation';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import Toast from 'react-native-toast-message';


const fromMoveToItem =(move: MoveFromComboQueryResponse): MoveItem => (
  { key: String(move.moveId),
    label: move.name,
    imageUrl: move.imageUrl,
    codeNo: move.codeNo,
    rank: move.rank
  }
)


const fromItemToMove =(item: MoveItem): MoveFromComboQueryResponse => (
  { moveId: Number(item.key),
    rank: item.rank,
    name: item.label,
    imageUrl: item.imageUrl,
    codeNo: item.codeNo,
  }
)


export default function EditCombo() {
  const { comboId, comboData } = useLocalSearchParams<{comboId: string, comboData?: string}>();
  const { data: combo, isLoading: isComboLoading } = useComboQuery(Number(comboId));

  const handleSuccess = () => {
    Toast.show({
      type: 'success',
      text1: '✅ Enregistré',
    });
    router.back()
  }


  const { mutate: editCombo } = useComboUpdateMutation(handleSuccess);
  
  // We use `moves` to display the list, and `updatedCombo` to pass data to another screen or save the combo
  const [moves, setMoves] = useState<MoveItem[]>([]) // To initialize moves
  const [updatedCombo, setUpdatedCombo] = useState<ComboQueryResponse | undefined>(comboData ? JSON.parse(comboData) : undefined)
  
  useEffect(() => {
    // If comboData is passed, we come here from another screen that passed a combo. Use it.
    if (comboData) {
      setUpdatedCombo(JSON.parse(comboData))
    }
    // If no comboData was passed, we set the combo in memory to the initial combo loaded from the backend
    else if (combo?.movesInCombo) {
      setUpdatedCombo(combo);
    }
  },[combo, comboData])

  useEffect(() => {
    // The moves displayed are from the combo on the fly
    if (updatedCombo?.movesInCombo) {
      setMoves(updatedCombo?.movesInCombo.map((move) => fromMoveToItem(move)))
    }
  }, [updatedCombo])
  
  const renderItem = useCallback(
    ({ item, index, drag, isActive}: RenderItemParams<MoveItem>) => {
      return (
        <DraggableMoveCard item={item} drag={drag} movesImagesDataset={movesImagesDataset} />
      )
    }
    ,[]
  )

  const handleSave = () => {
    if (updatedCombo) {
      editCombo({
        comboId: Number(comboId),
        updatedCombo: updatedCombo
      })
    }
  }

  const handleNewMove = () => {
    router.push({
      pathname:'/combo/newMove',
      params: {
        comboId: comboId,
        comboData: JSON.stringify(updatedCombo) }
    })
  }

  if (!combo || isComboLoading || !moves) {
    return
  }
  console.log("UPDATED COMBO", updatedCombo)
  return (
    <>
      <Body>
        <SignedIn>
            <ThemedView style={styles.titleContainer}>
              <Header>{combo.name}</Header>
              <ThemedView>
                  <Button title='Valider' onPress={handleSave} disabled={!updatedCombo} />
              </ThemedView>
              <DraggableFlatList
                data={moves}
                renderItem={renderItem}
                keyExtractor={(item, index) => `draggableItem-${item.key}`}
                onDragEnd={({ data }) => {
                  const updatedMoves = data.map((data, index) => ({...data, rank: index}));
                  setMoves(updatedMoves);
                  const updatedCombo = { ...combo, movesInCombo: updatedMoves.map((item) => (fromItemToMove(item))) }
                  setUpdatedCombo(updatedCombo);
                }}
              />
              <PlusButton onPress={handleNewMove} style={styles.plusButton}/>
            </ThemedView>
        </SignedIn>


        <SignedOut>
        <Link href="/(auth)/signIn">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/signUp">
          <Text>Sign up</Text>
        </Link>
        </SignedOut>
      </Body>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  plusButton: {
    alignItems: "center"
  }
});