import { movesImagesDataset } from '@/assets/datasets/movesImageDataset';
import { DraggableMoveCard, MoveItem } from '@/components/DraggableMoveCard';
import { Header } from '@/components/grid/Header';
import { PlusButton } from '@/components/PlusButton';
import { ThemedView } from '@/components/ThemedView';
import { ComboQueryResponse, MoveFromComboQueryResponse } from '@/src/api/combos';
import { useComboQuery } from '@/src/hooks/useComboQuery';
import { useComboUpdateMutation } from '@/src/hooks/useComboUpdateMutation';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

  const parsedComboData = useMemo(() => {
    return comboData ? JSON.parse(comboData) as ComboQueryResponse : undefined
  }, [comboData]); 

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '✅ Enregistré',
    });
  }

  const { mutate: editCombo } = useComboUpdateMutation(showToast);
  
  // We use `moves` to display the list, and `updatedCombo` to pass data to another screen or save the combo
  const [moves, setMoves] = useState<MoveItem[]>([]) // To initialize moves
  const [updatedCombo, setUpdatedCombo] = useState<ComboQueryResponse | undefined>(parsedComboData)

  // Set moves once loaded
  useEffect(() => {
    // If comboData is passed, we come here from another screen that passed a combo. Use it.
    if (parsedComboData) {
      setMoves(parsedComboData.movesInCombo.map((move) => fromMoveToItem(move)))
    }
    // If no comboData was passed, we load the initial moves of the combo
    else if (combo?.movesInCombo) {
      setUpdatedCombo(combo);
      setMoves(
        combo.movesInCombo.map((move) => fromMoveToItem(move)))
      }
  },[combo, parsedComboData])
  
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
    router.replace({
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