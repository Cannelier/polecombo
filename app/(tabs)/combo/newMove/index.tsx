import { movesImagesDataset } from "@/assets/datasets/movesImageDataset";
import { Body } from "@/components/grid/Body";
import { SearchBar } from "@/components/SearchBar";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/typography/ThemedText";
import { ComboQueryResponse, MoveFromComboQueryResponse } from "@/src/api/combos";
import { MoveData } from "@/src/api/moves";
import { useMovesQuery } from "@/src/hooks/useMovesQuery";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, View } from "react-native";

export default function NewMoveScreen() {
    const { comboId, comboData } = useLocalSearchParams<{comboId: string, comboData: string}>()
    const [currentMove, setCurrentMove] = useState<MoveData | undefined>(undefined);
    const [currentCombo, setCurrentCombo] = useState<ComboQueryResponse>(JSON.parse(comboData) as ComboQueryResponse)
    const { data: allMoves, isLoading: areAllMovesLoading } = useMovesQuery();

    if (areAllMovesLoading || !allMoves || !currentCombo) {
      return <ActivityIndicator />
    }

    const movesForDropdownList = allMoves?.map((move) => ({
        label: move.name,
        value: move,
    }))

    return (
        <>
        <Body>
            <View style={styles.container}>
                <View style={styles.searchHeader}>
                    <SearchBar
                        options={movesForDropdownList}
                        onSelect={(value: any) => setCurrentMove(value)}
                    />
                    <Button
                        title="Valider"
                        disabled={!currentMove} 
                        onPress={() => {
                            if (currentMove) {
                                const newCombo = {
                                    ...currentCombo,
                                    movesInCombo: [
                                        ...currentCombo.movesInCombo,
                                        {   
                                            moveId: currentMove.id,
                                            rank: currentCombo.movesInCombo.length,
                                            name: currentMove.name,
                                            imageUrl: currentMove.imageUrl,
                                            codeNo: currentMove.codeNo,
                                        } as MoveFromComboQueryResponse
                                    ]
                                };
                                setCurrentCombo(newCombo)
                                router.replace({
                                    pathname: `/combo/${comboId}`,
                                    params: {
                                        comboId: comboId,
                                        comboData: JSON.stringify(newCombo)
                                    }
                            })}
                        }}   
                    />
                </View>
                <Spacer />
                <View style={styles.imageContainer}>
                    {currentMove ? (
                        <Image source={movesImagesDataset[currentMove.codeNo]} 
                            style={styles.image}
                            />
                    ) : null}
                </View>

                {currentMove ? (
                    <>
                    <Spacer />
                        <View style={styles.moveHeader}>
                            <ThemedText type="title">{currentMove.name}</ThemedText>
                        </View>
                    </>
                    ) : null
                }
            </View>
        </Body></>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    imageContainer: {
        height: 200,
        width: 200,
        backgroundColor: "rgb(139, 126, 139)",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    moveHeader: {
        height: 100,
    },
  
})