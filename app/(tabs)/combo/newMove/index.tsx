import { movesImagesDataset } from "@/assets/datasets/movesImageDataset";
import { Body } from "@/components/grid/Body";
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
        value: move.id,
    }))
    
    return (
        <>
        <Body>
            <View style={styles.container}>
                <MoveSearchBar data={movesForDropdownList}
                    allMoves={allMoves}
                    currentMove={currentMove}
                    setCurrentMove={setCurrentMove}
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

// TODO: Type parameters
export function MoveSearchBar({
    allMoves,
    data,
    currentMove,
    setCurrentMove 
}: {
    allMoves: any,
    data: any,
    currentMove: any
    setCurrentMove: (move: any) => void
}) {
    const [isFocus, setIsFocus] = useState(false);

    return (
    <></>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    imageContainer: {
        height: 300,
        width: 300,
        backgroundColor: "pink",
    },
    image: {
        height: 300,
        width: 300,
    },
    moveHeader: {
            height: 100,
    },



    dropdown: {
      width: '100%', 
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

})