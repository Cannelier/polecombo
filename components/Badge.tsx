import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./typography/ThemedText";


interface BadgeProps {
    color: "white"
    | "indigo"
    | "orange"
    | "brown"
    | "purple"
    | "indigoLight"
    | "lila"
    | "orangeLight",
    children: React.ReactNode
}

export function Badge({ color, children }: BadgeProps) {
    const badgeColors = {
        white: {
            backgroundColor: 'rgb(255, 255, 255)',
            textColor: 'black'
        },
        indigoLight: {
            backgroundColor: 'rgb(169, 185, 222)',
            textColor: 'white'
        },
        indigo: {
            backgroundColor: 'rgb(121, 148, 210)',
            textColor: 'white'
        },
        lila: {
            backgroundColor: 'rgb(181, 180, 238)',
            textColor: 'white'
        },
        purple: {
            backgroundColor: 'rgb(158, 133, 211)',
            textColor: 'white'
        },
        orange: {
            backgroundColor: 'rgb(216, 143, 42)',
            textColor: 'white'
        },
        orangeLight: {
            backgroundColor: 'rgb(222, 176, 112)',
            textColor: 'white'
        },
        brown: {
            backgroundColor: 'rgb(180, 123, 102)',
            textColor: 'white'
        },
    }

    return (
        <ThemedView style={[
            styles.badgeContainer,
            { backgroundColor: badgeColors[color].backgroundColor }
        ]}>
            <ThemedText
                type="subtitle"
                style={{ color: badgeColors[color].textColor }}
            >
                {children}
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
})