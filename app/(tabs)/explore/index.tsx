
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/typography/ThemedText';
import { areFirstLettersFound } from '@/helpers/search';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from 'react-native';

export interface MoveToDisplay {
  posaCode: string,
  displayName: string,
  imageUrl: string,
}

export default function ExploreScreen() {
  const movesData = undefined
  if (!movesData)  {
    return (<ActivityIndicator />)
  }
  const moves: MoveToDisplay[] = movesData.map((moveData) => ({
    posaCode: moveData.posaCode,
    displayName: moveData.displayName,
    imageUrl: moveData.imageUrl
  }));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredMoves = useMemo(() => {
    if (!moves) return [];
    if (!searchQuery) return moves;
    return moves.filter((move) =>
      areFirstLettersFound(move.displayName, searchQuery))
  }, [moves, searchQuery])

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({ item }: {item : MoveToDisplay}) => (
    <>
    <View style={styles.card}>
      <Image
          source={movesImagesDataset[item.posaCode]}
          style={styles.image}
      />
      <ThemedText style={styles.cardTitle}>{item.displayName}</ThemedText>
    </View>
    </>
  );

  return (
    <>
    <Body>
      <Header>Moves</Header>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={item => item.posaCode}
        numColumns={3}/>
    </Body>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    width: 100,
    height: 120,
    borderColor:"#DDDDDD",
    borderWidth: 0.3,
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
  },
  cardTitle: {
    fontSize: 10,
  }
});
