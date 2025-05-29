import { DropdownItem, DropdownSearchbar } from "@/components/DropdownSearchbar";
import { Body } from "@/components/grid/Body";
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

    const movesForDropdownList: DropdownItem[] = allMoves?.map((move) => ({
        label: move.name,
        value: move,
        imageSource: move.codeNo,
    }))

    const handleAddOption = () => {
        router.navigate({
            pathname: "/combo/newMove/customMove",
            params: {
                comboId: Number(comboId),
                comboData: JSON.stringify(currentCombo)
            }
        })
    }

    return (
        <>
        <Body>
            <View style={styles.container}>
                <View>
                    <DropdownSearchbar
                        options={movesForDropdownList}
                        onSelect={(value: any) => setCurrentMove(value)}
                        handleAddOption={handleAddOption}
                    />
                </View>
                

                {currentMove ? (
                    <>
                        <View>
                            <Button
                                title="Valider"
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
                            <Image source={{ uri: currentMove.imageUrl}} 
                                style={styles.image}
                                />
                        </View>
                        <Spacer />
                        <View style={styles.moveHeader}>
                            <ThemedText type="title">{currentMove.name}</ThemedText>
                        </View>
                    </>
                    ) : null }
            </View>
        </Body>
        </>
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