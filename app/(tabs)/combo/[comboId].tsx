import { movesImagesDataset } from '@/assets/datasets/movesImageDataset';
import { DraggableMoveCard, MoveItem } from '@/components/DraggableMoveCard';
import { Header } from '@/components/grid/Header';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { useComboQuery } from '@/src/queries/useComboQuery';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";




export default function EditCombo() {
  const { comboId } = useLocalSearchParams<{comboId: string}>();
  const { data: combo, isLoading: isComboLoading } = useComboQuery(Number(comboId));

  const [moves, setMoves] = useState<MoveItem[] | undefined>([])

  // Set moves once loaded
  useEffect(() => {
    if (combo?.moves) {
      setMoves(
        combo.moves.map((move) => {
          return {
            key: String(move.moveId),
            label: move.name,
            imageUrl: move.imageUrl,
            codeNo: move.codeNo
          }
        }))
      }
  },[combo])
  
  const renderItem = useCallback(
    ({ item, index, drag, isActive}: RenderItemParams<MoveItem>) => {
      return (
        <DraggableMoveCard item={item} drag={drag} movesImagesDataset={movesImagesDataset} />
      )
    }
    ,[]
  )

  if (!combo || isComboLoading || !moves) {
    return
  }
  
  return (
    <>
      <SignedIn>
          <ThemedView style={styles.titleContainer}>
            <Header>{combo.name}</Header>
            <DraggableFlatList
              data={moves}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggableItem-${item.key}`}
              onDragEnd={({ data }) => { setMoves(data) }}
            />
            <Spacer/>
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
});