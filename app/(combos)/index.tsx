import { ComboCard } from '@/components/ComboCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useCombosQuery } from '../queries/useCombosQuery';




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

          <ScrollView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            {combos.map((combo) => {

              return(<ComboCard combo={combo} key={combo.name}/>)
            })}
          </ThemedView>
          </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
