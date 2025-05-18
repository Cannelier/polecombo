import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./typography/ThemedText";

export function PlusButton({ onPress, style }: { onPress: () => void, style: any }) {
    const color = "#CCCCCC"
    return(
        <View style={style}>
            <TouchableOpacity
                onPress={onPress}
                 style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: color
            }}>
                <ThemedText lightColor={color} style={{
                    fontSize: 35,
                    lineHeight: 35, // close to fontSize but slightly more for better vertical centering
                }}>
                    +
                </ThemedText>
            </TouchableOpacity>
        </View>
    )
}