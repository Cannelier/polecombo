import { Body } from "@/components/grid/Body";
import UploadImage from "@/components/UploadImage";
import { MoveFromComboQueryResponse } from "@/src/api/combos";
import { useCustomMoveMutation } from "@/src/hooks/useCustomMoveMutation";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

export default function CustomMoveScreen() {
    const [moveName, setMoveName] = useState("");
    const { comboId, comboData } = useLocalSearchParams<{ comboId: string; comboData?: string }>();

    const handleSuccess = (data: { id: string }) => {
        const { id } = data;
        const parsedComboData = JSON.parse(comboData);
        const newCombo = {
            ...parsedComboData,
            movesInCombo: [
                ...parsedComboData.movesInCombo,
                {   
                    moveId: Number(id),
                    rank: parsedComboData.movesInCombo.length,
                    name: moveName,
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
                onPress={() => createCustomMove({ moveName })}
                disabled={!moveName}
            />
            <UploadImage />
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
})