import { ReactNode } from "react";
import { StyleSheet } from 'react-native';
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../typography/ThemedText";

export const Header = ({children}: {children: ReactNode }) => (

    <ThemedView style={styles.header}>
        <ThemedText type="title">
            {children}
        </ThemedText>
    </ThemedView>
)

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    padding: 10,
  },
});
