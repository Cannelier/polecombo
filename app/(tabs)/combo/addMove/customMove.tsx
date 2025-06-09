import { Body } from "@/components/grid/Body";
import UploadImage from "@/components/UploadImage";
import { useCustomMoveMutation } from "@/frontend/hooks/useCustomMoveMutation";
import { MoveFromComboQueryResponse } from "@/src/api/combos";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function CustomMoveScreen() {
    const [moveName, setMoveName] = useState("");
    const { comboId, comboData } = useLocalSearchParams<{ comboId: string; comboData: string }>();
    const [image, setImage] = useState<ImagePickerAsset | null>(null);

    const handleSuccess = (data: { id: string, name: string, imageUrl?: string | null }) => {
        const { id, name, imageUrl } = data;
        const parsedComboData = JSON.parse(comboData);
        const newCombo = {
            ...parsedComboData,
            movesInCombo: [
                ...parsedComboData.movesInCombo,
                {   
                    moveId: Number(id),
                    rank: parsedComboData.movesInCombo.length,
                    displayName: name,
                    imageUrl: imageUrl,
                } as MoveFromComboQueryResponse
            ]
        };
        router.replace({
            pathname: `/combo/${comboId}`,
            params: {
                comboId: Number(comboId),
                comboData: JSON.stringify(newCombo)
            }
        })
    }
    const { mutate: createCustomMove } = useCustomMoveMutation(handleSuccess)

    return (
        <Body>
            <TextInput
                style={styles.moveName}
                value={moveName}
                onChangeText={(input) => setMoveName(input)}
                placeholder={"NOM DE LA FIGURE"}
                placeholderTextColor="grey"
                autoFocus
            ></TextInput>
            <Button
                title="Créer"
                onPress={() => createCustomMove({ moveName, image })}
                disabled={!moveName}
            />
            <View style={styles.uploadImageContainer}>
                <UploadImage setImage={setImage} />
                {image && <Image source={{ uri: image.uri }} style={styles.image} />}
            </View>
        </Body>
    )
}

const styles = StyleSheet.create({
    moveName: {
        color: "#FFFFFF",
        fontSize: 24,
        lineHeight: 32,
        fontFamily: "NunitoSansExtraBold",
        textAlign: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
    uploadImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})