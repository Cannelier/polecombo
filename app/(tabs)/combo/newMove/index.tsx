import { movesImagesDataset } from "@/assets/datasets/movesImageDataset";
import { Body } from "@/components/grid/Body";
import { SearchBar } from "@/components/SearchBar";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/typography/ThemedText";
import { MoveData } from "@/src/api/moves";
import { useMovesQuery } from "@/src/hooks/useMovesQuery";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function NewMoveScreen() {
    const [currentMove, setCurrentMove] = useState<MoveData | undefined>(undefined);
    
    const { data: allMoves, isLoading: areAllMovesLoading } = useMovesQuery();

    if (areAllMovesLoading || !allMoves) {
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
                <SearchBar
                    options={movesForDropdownList}
                    onSelect={(value: any) => setCurrentMove(value)}
                />
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
        backgroundColor: "pink",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    moveHeader: {
        height: 100,
    },
    
})