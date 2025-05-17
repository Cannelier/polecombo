import { View } from "react-native";

type SpacerProps = {
    size?: number,
    horizontal?: boolean
}

export const Spacer = ({size = 8, horizontal = false}: SpacerProps) => (
    <View style={
        horizontal ? { width: size } : { height: size}
    } />
)