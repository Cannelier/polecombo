import { useAuth } from '@/components/auth/AuthProvider';
import { ComboCard } from '@/components/ComboCard';
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { SearchBar } from '@/components/SearchBar';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { useCombosCreatedByUserQuery } from '@/frontend/hooks/useCombosCreatedByUserQuery';
import { areFirstLettersFound } from '@/helpers/search';
import { ComboQueryResponse } from '@/src/api/combos';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';



export default function HomeScreen() {
  const { userId, isUserLoading } = useAuth();
  const { data: combos, isLoading: areCombosLoading } = useCombosCreatedByUserQuery(userId ?? undefined);
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery)
  }
  const filteredCombos: ComboQueryResponse[] = useMemo(() => {
    if (!combos) return [];
    if (!searchQuery) return combos;
    return combos?.filter((combo) =>
      areFirstLettersFound(combo.name, searchQuery)
    );
  }, [combos, searchQuery])

  if (!combos || areCombosLoading || isUserLoading) {
    return <ActivityIndicator/>
  }

  return (
      <Body>
        <Header>Mes combos</Header>
        <ThemedView>
          <SearchBar onSearch={handleSearch} />
          {filteredCombos?.map((combo) => {
            return (
                <React.Fragment key={combo.comboId}>
                  <ComboCard combo={combo}/>
                  <Spacer/>
                </React.Fragment>
            )
          })}
        </ThemedView>
    </Body>
  );
}

