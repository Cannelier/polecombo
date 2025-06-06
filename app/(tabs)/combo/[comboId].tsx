import { DraggableMoveCard, MoveItem } from '@/components/DraggableMoveCard';
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { PlusButton } from '@/components/PlusButton';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/typography/ThemedText';
import { ComboQueryResponse, MoveFromComboQueryResponse } from '@/src/api/combos';
import { useComboUpdateMutation } from '@/src/hooks/useComboUpdateMutation';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import Toast from 'react-native-toast-message';


const fromMoveToItem = (move: MoveFromComboQueryResponse): MoveItem => (
  { key: `${String(move.moveId)}`,
    label: move.name,
    imageUrl: move.imageUrl,
    rank: move.rank
  }
)


const fromItemToMove = (item: MoveItem): MoveFromComboQueryResponse => (
  { moveId: Number(item.key),
    rank: item.rank,
    name: item.label,
    imageUrl: item.imageUrl,
  }
)


export default function EditCombo() {
  const { comboId, comboData, initialCombo } = useLocalSearchParams<{ comboId: string; comboData?: string; initialCombo?: string }>();
  const initialComboData: ComboQueryResponse = useMemo(() => {
    return initialCombo ? JSON.parse(initialCombo) : undefined;
  }, [initialCombo]);
  console.log(initialComboData)
  const handleSuccess = () => {
    Toast.show({
      type: 'success',
      text1: `✅ ${initialComboData?.name} a été enregistré`,
    });
  router.replace({
    pathname: '/combo', // back to main list
});
  };

  const { mutate: editCombo } = useComboUpdateMutation(handleSuccess);

  const [moves, setMoves] = useState<MoveItem[]>([]);
  const [updatedCombo, setUpdatedCombo] = useState<ComboQueryResponse | undefined>(
    comboData ? JSON.parse(comboData) : undefined
  );

  useEffect(() => {
    if (comboData) {
      const parsed = JSON.parse(comboData);
      setUpdatedCombo(parsed);
      setMoves(parsed.movesInCombo.map(fromMoveToItem));
    }
  }, [comboData]);

  useEffect(() => {
    if (!comboData && initialComboData?.movesInCombo) {
      setUpdatedCombo(initialComboData);
      setMoves(initialComboData.movesInCombo.map(fromMoveToItem));
    }
  }, [comboData, initialComboData]);

  const isDataReady = updatedCombo !== undefined || initialComboData !== undefined;

  const handleDelete = (item: MoveItem) => {
    if (!isDataReady) {
      // Prevent delete if data isn't ready yet
      console.log("Delete blocked - data not ready");
      return;
    }

    const updatedMoves = moves.filter((move) => move.rank !== item.rank);
    setMoves(updatedMoves);
    setUpdatedCombo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        movesInCombo: updatedMoves.map((item) => fromItemToMove(item)),
      };
    });
  };

  const handleSave = () => {
    if (!isDataReady) return;
    editCombo({
      comboId: Number(comboId),
      updatedCombo: updatedCombo!,
    });
  };

  const handleNewMove = () => {
    if (!isDataReady) return;
    router.push({
      pathname: '/combo/newMove',
      params: {
        comboId: comboId,
        comboData: JSON.stringify(updatedCombo),
      },
    });
  };

  if (!isDataReady) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <Body>
      <SignedIn>
        <ThemedView style={styles.titleContainer}>
          <Header>{initialComboData?.name || updatedCombo?.name}</Header>
          { moves.length ? (
            <>
              <ThemedView>
                <Button title="Valider" onPress={handleSave} disabled={!isDataReady || updatedCombo === initialComboData} />
              </ThemedView>
              <DraggableFlatList
                data={moves}
                renderItem={({ item, drag }) => (
                  <DraggableMoveCard
                    item={item}
                    drag={drag}
                    handleDelete={() => handleDelete(item)}
                  />
                )}
                keyExtractor={(item) => `draggableItem-${item.key}`}
                onDragEnd={({ data }) => {
                  const updatedMoves = data.map((item, index) => ({ ...item, rank: index }));
                  setMoves(updatedMoves);
                  setUpdatedCombo((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      movesInCombo: updatedMoves.map(fromItemToMove),
                    };
                  });
                }}
                activationDistance={10}
              />
            </>
          ) : <NoMovesInCombo /> }
          <PlusButton onPress={handleNewMove} style={styles.plusButton} />
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
  );
}

function NoMovesInCombo() {
  return (
    <>
      <ThemedText style={styles.noMovesInComboText}>Appuyez sur + pour ajouter des figures.</ThemedText>
      <Spacer/>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  plusButton: {
    alignItems: "center"
  },
  noMovesInComboText: {
    textAlign: "center"
  }
});