import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

interface PlusButtonProps {
    onPress: () => void,
    style?: any,
    isLight?: boolean
}

export function PlusButton({
    onPress,
    style,
    isLight = false
}: PlusButtonProps) {

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
                    source={isLight ? require("@/assets/svg/plusLight.svg")
                        : require("@/assets/svg/plus.svg")
                    }
                    style={{
                        width:30,
                        height:30,
                    }} />
            </TouchableOpacity>
        </View>
    )
}