import { DropdownItem, DropdownSearchbar } from "@/components/DropdownSearchbar";
import { Body } from "@/components/grid/Body";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/typography/ThemedText";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { ComboQueryResponse, MoveFromComboQueryResponse } from "@/src/api/combos";
import { MoveData } from "@/src/api/moves";
import { useFilteredMovesQuery } from "@/src/hooks/useFilteredMovesQuery";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, View } from "react-native";

export default function NewMoveScreen() {
    const { comboId, comboData } = useLocalSearchParams<{comboId: string, comboData: string}>()
    const [currentMove, setCurrentMove] = useState<MoveData & { displayName: string} | undefined>(undefined);
    const [currentCombo, setCurrentCombo] = useState<ComboQueryResponse>(JSON.parse(comboData) as ComboQueryResponse)
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 900);
    const { data: filteredMoves, isLoading: areFilteredMovesLoading } = useFilteredMovesQuery(debouncedSearchQuery);

    const handleSelect = useCallback((value: MoveData) => {
    setCurrentMove(value);
    }, []);

    const handleAddOption = useCallback(() => {
        router.navigate({
            pathname: "/combo/addMove/customMove",
            params: {
            comboId: Number(comboId),
            comboData: JSON.stringify(currentCombo),
            },
        });
    }, [comboId, currentCombo]);

    if (areFilteredMovesLoading || !filteredMoves || !currentCombo) {
      return <ActivityIndicator />
    }

    const movesForDropdownList: DropdownItem[] = filteredMoves?.map((move) => ({
        label: move.displayName,
        value: move as MoveData,
        imageSource: move.imageUrl,
    }))
    return (
        <>
        <Body>
            <View style={styles.container}>
                <View>
                    <DropdownSearchbar
                        options={movesForDropdownList}
                        onSelect={handleSelect}
                        handleAddOption={handleAddOption}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
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
                                                    displayName: currentMove.displayName,
                                                    imageUrl: currentMove.imageUrl,
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
                            <ThemedText type="title">{currentMove.displayName}</ThemedText>
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