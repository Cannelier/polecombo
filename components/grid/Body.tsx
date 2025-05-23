import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from "react";
import { StyleSheet } from 'react-native';
import { ThemedView } from "../ThemedView";

export const Body = ({children}: {children: ReactNode }) => (
    <ThemedView style={{ flex: 1 }}>
     <LinearGradient
        colors={['rgba(26, 22, 30, 1)','rgba(91, 55, 137, 0.9)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.8, y: 0 }}
      />
      <LinearGradient
        colors={['rgba(26, 22, 30, 0.1)','rgba(236, 176, 16, 0.3)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 1, y: 0 }}
      />
    <ThemedView style={{ padding: 30, backgroundColor: "transparent" }}>
      {children}
    </ThemedView>
  </ThemedView>
)