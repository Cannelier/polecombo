import { ComboCard } from '@/components/ComboCard';
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { SearchBar } from '@/components/SearchBar';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { areFirstLettersFound } from '@/helpers/search';
import { useCombosQuery } from '@/src/hooks/useCombosQuery';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';



export default function HomeScreen() {
  const { data: combos, isLoading: areCombosLoading } = useCombosQuery();
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery)
  }
  const filteredCombos = useMemo(() => {
    if (!combos) return [];
    if (!searchQuery) return combos;
    return combos?.filter((combo) =>
      areFirstLettersFound(combo.name, searchQuery)
    );
  }, [combos, searchQuery])

  if (!combos || areCombosLoading) {
    return
  }

  return (
    <>
      <SignedIn>
          <Body>
            <Header>Mes combos</Header>
            <ThemedView>
              <SearchBar onSearch={handleSearch} />
              {filteredCombos?.map((combo) => {
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

