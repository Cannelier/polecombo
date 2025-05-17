import { ComboCard } from '@/components/ComboCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/typography/Header';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useCombosQuery } from '../../../src/queries/useCombosQuery';




export default function HomeScreen() {

  const { user } = useUser()
  const { data: combos, isLoading: areCombosLoading } = useCombosQuery();


  if (!combos || areCombosLoading) {
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
            <Spacer/>
            {combos.map((combo) => {
              return (
                <>
                  <ComboCard combo={combo} key={combo.name}/>
                  <Spacer/>
                </>
              )
            })}
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
