import { Body } from "@/components/grid/Body";
import UploadImage from "@/components/UploadImage";
import { useCustomMoveMutation } from "@/src/hooks/useCustomMoveMutation";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

export default function CustomMoveScreen() {
    const [moveName, setMoveName] = useState("");
    const { mutate: createCustomMove } = useCustomMoveMutation()

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