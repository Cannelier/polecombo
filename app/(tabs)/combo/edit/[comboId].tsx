import { DraggableMoveCard, MoveItem } from '@/components/DraggableMoveCard';
import { Body } from '@/components/grid/Body';
import { PlusButton } from '@/components/PlusButton';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/typography/ThemedText';
import { useComboQuery } from '@/frontend/hooks/useComboQuery';
import { useComboUpdateMutation } from '@/frontend/hooks/useComboUpdateMutation';
import { ComboQueryResponse, MoveFromComboQueryResponse } from '@/src/api/combos';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, useColorScheme } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';


const fromMoveToItem = (move: MoveFromComboQueryResponse): MoveItem => (
  { key: `${String(move.moveId)}`,
    label: move.displayName,
    imageUrl: move.imageUrl,
    rank: move.rank
  }
)


const fromItemToMove = (item: MoveItem): MoveFromComboQueryResponse => (
  { moveId: Number(item.key),
    rank: item.rank,
    displayName: item.label,
    imageUrl: item.imageUrl,
  }
)


export default function EditCombo() {
  const { comboId, comboData } = useLocalSearchParams<{ comboId: string; comboData?: string; initialCombo?: string }>();
  
  // Get initial combo
  const { data: initialComboData, isLoading: isInitialComboLoading } = useComboQuery(Number(comboId))

  const handleSuccess = () => {
    Toast.show({
      type: 'success',
      text1: `✅ ${updatedCombo?.name} a été enregistré`,
    });
  router.replace({
    pathname: `/combo/${comboId}`,
});
  };

  const { mutate: editCombo } = useComboUpdateMutation(handleSuccess);
  const [moves, setMoves] = useState<MoveItem[]>([]);
  const [updatedCombo, setUpdatedCombo] = useState<ComboQueryResponse | undefined>(
    comboData ? JSON.parse(comboData) : undefined
  );
  const [comboName, setComboName] = useState<string>(initialComboData?.name || updatedCombo?.name || '');

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const comboNameStyle = isDarkMode ? styles.comboName : {
      ...styles.comboName,
      color: "rgb(152, 152, 186)",
  };

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

  useEffect(() => {
    setUpdatedCombo(prev => {
      if (!prev) {
        return {
          name: comboName,
          movesInCombo: [],
        };
      }

      if (prev.name === comboName) {
        return prev; // avoid unnecessary update
      }

      return {
        ...prev,
        name: comboName,
      };
    });
  }, [comboName]);
  
  const isDataReady = !isInitialComboLoading || updatedCombo !== undefined || initialComboData !== undefined;

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
      pathname: '/combo/addMove',
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
      <ThemedView style={styles.titleContainer}>
        <TextInput
            style={comboNameStyle}
            value={comboName}
            onChangeText={setComboName}
            placeholder={"Nom du combo".toUpperCase()}
            placeholderTextColor={isDarkMode ? "#FFFFFF" : "rgb(152, 152, 186)"}
            autoFocus
        />
        { moves.length ? (
          <>
            <ThemedView>
              <Button title="Valider" onPress={handleSave} disabled={
                !isDataReady
                || updatedCombo === initialComboData
                || !updatedCombo?.name
                } />
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
  },
  comboName: {
      color: "#FFFFFF",
      fontSize: 24,
      lineHeight: 32,
      fontFamily: "NunitoSansExtraBold",
      textAlign: "center",
      textAlignVertical: "center",
      width: "100%",
  },
});