import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from "react";
import { StyleSheet, useColorScheme } from 'react-native';
import { ThemedView } from "../ThemedView";

export const Body = ({children}: {children: ReactNode }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    if (isDarkMode) {
        return (
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
  }

  // Light mode
  return (
    <ThemedView style={{ flex: 1 }}>
    <LinearGradient
      colors={[
        'rgba(255, 255, 255, 1)',       // Pure white (top-left)
        'rgba(125, 121, 205, 0.5)',    // Soft lila (top-right)
        'rgba(255, 255, 255, 1)'     // Back to white (bottom)
      ]}
      locations={[0, 0.5, 0.8]}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 0.9 }}
    />
    <LinearGradient
      colors={[
        'rgba(255, 255, 255, 0.8)',
        'rgba(228, 101, 32, 0.19)',
        'rgba(255, 255, 255, 0.3)'
      ]}
      locations={[0, 0.5, 0.8]}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 0.6, y: 0.5 }}
    />
    <LinearGradient
      colors={[
        'rgba(255, 255, 255, 0)',
        'rgba(125, 121, 205, 0.2)',
        'rgba(255, 255, 255, 0.7)'
      ]}
      locations={[0, 0.1, 0.4]}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 0.8 }}
    />
      <ThemedView style={{ padding: 30, backgroundColor: "transparent" }}>
        {children}
      </ThemedView>
    </ThemedView>
  )
}