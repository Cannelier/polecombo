import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/typography/Header';
import { ThemedText } from '@/components/typography/ThemedText';
import { useComboQuery } from '@/src/queries/useComboQuery';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';




export default function EditCombo() {
  const { comboId } = useLocalSearchParams<{comboId: string}>();
  const { user } = useUser()
  const { data: combo, isLoading: isComboLoading } = useComboQuery(Number(comboId));

  if (!combo || isComboLoading) {
    return
  }
  
  return (
    <>
      <SignedIn>
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.reactLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <Header>Mes combos</Header>
            {combo.moves.map((move) => (
              <ThemedText>
                {move.name}
              </ThemedText>
            ))}
            <Spacer/>
          </ThemedView>
        </ParallaxScrollView>
      </SignedIn>


      <SignedOut>
      <Link href="/(auth)/signIn">
        <Text>Sign in</Text>
      </Link>
      <Link href="/(auth)/signUp">
        <Text>Sign up</Text>
      </Link>
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
