import { AuthProvider } from '@/components/auth/AuthProvider';
import { getQueryClient } from '@/frontend/hooks/useQueryClient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    NunitoSansLight: require('@/assets/fonts/NunitoSansLight.ttf'),
    NunitoSansRegular: require('@/assets/fonts/NunitoSansRegular.ttf'),
    NunitoSansBold: require('@/assets/fonts/NunitoSansBold.ttf'),
    NunitoSansExtraBold: require('@/assets/fonts/NunitoSansExtraBold.ttf'),
  });
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  
  const queryClient = getQueryClient();
  
  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaView
              style={{ flex: 1 }} 
              edges={['left', 'right']} // skip top and bottom safe areas
            >
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </GestureHandlerRootView>
            </SafeAreaView>
            <Toast />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
  </>
  );
}
