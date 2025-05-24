import movesData from '@/assets/datasets/moves.json';
import { movesImagesDataset } from '@/assets/datasets/movesImageDataset';
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { Searchbar } from '@/components/Searchbar';
import { ThemedText } from '@/components/typography/ThemedText';
import { areFirstLettersFound } from '@/helpers/search';
import { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

export interface MoveToDisplay {
  codeNo: string,
  name: string,
  imageUrl: string,
}

export default function ExploreScreen() {
  const moves: MoveToDisplay[] = movesData.map((moveData) => ({
    codeNo: moveData.codeNo,
    name: moveData.name,
    imageUrl: moveData.imageUrl
  }));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredMoves = useMemo(() => {
    if (!moves) return [];
    if (!searchQuery) return moves;
    return moves.filter((move) =>
      areFirstLettersFound(move.name, searchQuery))
  }, [moves, searchQuery])

  const handleSearch = (search: string) => {
    setSearchQuery(search)
  }

  const renderItem = ({ item }: {item : MoveToDisplay}) => (
    <>
    <View style={styles.card}>
      <Image
          source={movesImagesDataset[item.codeNo]}
          style={styles.image}
      />
      <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
    </View>
    </>
  );

  return (
    <>
    <Body>
      <Header>Moves</Header>
      <Searchbar onSearch={handleSearch} />
      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={item => item.codeNo}
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
