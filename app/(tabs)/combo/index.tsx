import { ComboCard } from '@/components/ComboCard';
import { Body } from '@/components/grid/Body';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
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
          <Spacer/>
          <Body>
            <ThemedView style={styles.columnContainer}>
              {combos.map((combo) => {
                return (
                  <>
                    <ComboCard combo={combo} key={combo.name}/>
                    <Spacer/>
                  </>
                )
              })}
            </ThemedView>
        </Body>
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
  columnContainer: {
    flexDirection: 'column',
  }
});
