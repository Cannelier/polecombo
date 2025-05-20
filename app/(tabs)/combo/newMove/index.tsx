import { movesImagesDataset } from "@/assets/datasets/movesImageDataset";
import { Body } from "@/components/grid/Body";
import { SearchBar } from "@/components/SearchBar";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/typography/ThemedText";
import { MoveData } from "@/src/api/moves";
import { useMovesQuery } from "@/src/hooks/useMovesQuery";
import { useNewComboMoveMutation } from "@/src/hooks/useNewComboMoveMutation";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function NewMoveScreen() {
    const { comboId } = useLocalSearchParams()
    const [currentMove, setCurrentMove] = useState<MoveData | undefined>(undefined);

    const showToast = () => {
        Toast.show({
        type: 'success',
        text1: '✅ Enregistré',
        });
    }
    const handleSuccess = () => {
        showToast()
        setTimeout(() =>{ router.back()}, 1000)
    }

    const { data: allMoves, isLoading: areAllMovesLoading } = useMovesQuery();
    const { mutate: addComboMove } = useNewComboMoveMutation(handleSuccess)

    if (areAllMovesLoading || !allMoves || !comboId) {
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
                            addComboMove({
                                comboId: Number(comboId),
                                moveId: currentMove!.id
                            })
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
        backgroundColor: "pink",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    moveHeader: {
        height: 100,
    },

    searchHeader: {
        flexDirection: 'row',
    }
    
})