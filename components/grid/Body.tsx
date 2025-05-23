import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from "react";
import { StyleSheet } from 'react-native';
import { ThemedView } from "../ThemedView";

export const Body = ({children}: {children: ReactNode }) => (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={['rgba(6, 8, 35, 0.88)','rgba(17, 21, 76, 0.88)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.6, y: 0.6 }}
        end={{ x: 1, y: 1 }}
      />
    <ThemedView style={{ padding: 30, backgroundColor: "transparent" }}>
      {children}
    </ThemedView>
  </ThemedView>
)