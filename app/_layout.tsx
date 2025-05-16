import { ClerkProvider } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Constants from "expo-constants";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {
  QueryClientProvider
} from '@tanstack/react-query';
import { getQueryClient } from './hooks/useQueryClient';

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  
  const clerkPublishableKey = Constants?.expoConfig?.extra?.clerkPublishableKey;
  const queryClient = getQueryClient();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        tokenCache={tokenCache}
      >
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(combos)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
