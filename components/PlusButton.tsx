import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

export function PlusButton({ onPress, style }: { onPress: () => void, style: any }) {
    const color = "#CCCCCC"
    return(
        <View style={style}>
            <TouchableOpacity
                onPress={onPress}
                 style={{
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
            }}>
                <Image
                    source={require("@/assets/svg/plus.svg")}
                    style={{
                        width:30,
                        height:30,
                    }} />
            </TouchableOpacity>
        </View>
    )
}