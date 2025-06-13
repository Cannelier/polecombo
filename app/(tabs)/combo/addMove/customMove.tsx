import { useAuth } from "@/components/auth/AuthProvider";
import { Body } from "@/components/grid/Body";
import { CARD_HEIGHT, CARD_IMAGE_HEIGHT } from "@/components/MoveCard";
import { ThemedView } from "@/components/ThemedView";
import UploadImage from "@/components/UploadImage";
import { useCustomMoveMutation } from "@/frontend/hooks/useCustomMoveMutation";
import { UNDEFINED_MOVE_IMAGE_URL } from "@/shared/constants";
import { MoveFromComboQueryResponse } from "@/src/api/combos";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, TextInput, useColorScheme } from "react-native";

export default function CustomMoveScreen() {
    const { customMoveName } = useLocalSearchParams<{ customMoveName?: string }>();
    console.log("customMoveName", customMoveName);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const { comboId, comboData } = useLocalSearchParams<{ comboId: string; comboData: string }>();

    const { userId, isUserLoading } = useAuth();
    const [moveName, setMoveName] = useState(customMoveName || '');
    const [image, setImage] = useState<ImagePickerAsset | null>(null);
    const moveNameStyle = isDarkMode ? styles.moveName : {
        ...styles.moveName,
        color: "rgb(152, 152, 186)",
    };

    const handleSuccess = (data: { id: string, displayName: string, imageUrl?: string | null }) => {
        const { id, displayName, imageUrl } = data;
        const parsedComboData = JSON.parse(comboData);
        const newCombo = {
            ...parsedComboData,
            movesInCombo: [
                ...parsedComboData.movesInCombo,
                {   
                    moveId: Number(id),
                    rank: parsedComboData.movesInCombo.length,
                    displayName: displayName,
                    imageUrl: imageUrl,
                } as MoveFromComboQueryResponse
            ]
        };
        router.replace({
            pathname: `/combo/edit/${comboId}`,
            params: {
                comboId: Number(comboId),
                comboData: JSON.stringify(newCombo)
            }
        })
    }
    const { mutate: createCustomMove } = useCustomMoveMutation(handleSuccess)

    if (!userId || isUserLoading) {
        return <ActivityIndicator />
    }

    return (
        <Body>
            <Button
                title="Créer"
                onPress={() => createCustomMove({
                    userId,
                    moveName,
                    image
                })}
                disabled={!moveName}
            />
            <UploadImage setImage={setImage} />
            
            <ThemedView style={styles.card}>
                <ThemedView style={styles.cardTitleContainer}>
                    <TextInput
                        style={moveNameStyle}
                        value={moveName}
                        onChangeText={setMoveName}
                        placeholder={customMoveName || "Nom de la figure"}
                        placeholderTextColor={isDarkMode ? "#FFFFFF" : "rgb(152, 152, 186)"}
                        autoFocus
                    />
                </ThemedView>
                <Image
                    source={{ uri: image ? image.uri : UNDEFINED_MOVE_IMAGE_URL }}
                    style={styles.image}
                />
            </ThemedView>
        </Body>
    )
}

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
        width: '90%',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'rgb(236, 232, 239)',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
        alignItems: 'center',
        paddingBottom: 30,
    },
    image: {
        flex: 1,
        width: CARD_IMAGE_HEIGHT,
        height: CARD_IMAGE_HEIGHT
    },
    cardTitleContainer: {
        marginVertical: 15,
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    moveName: {
        color: "#FFFFFF",
        fontSize: 24,
        lineHeight: 32,
        fontFamily: "NunitoSansExtraBold",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%", // <- ensure width to prevent truncation
    },
})