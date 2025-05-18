import movesData from '@/assets/datasets/moves.json';
import { movesImagesDataset } from '@/assets/datasets/movesImageDataset';
import { Body } from '@/components/grid/Body';
import { Header } from '@/components/grid/Header';
import { ThemedText } from '@/components/typography/ThemedText';
import { FlatList, Image, StyleSheet, View } from 'react-native';

export interface MoveToDisplay {
  codeNo: string,
  name: string,
  imageUrl: string,
}

export default function ExploreScreen() {
  const moves: MoveToDisplay[] = movesData.map((moveData) => ({
    codeNo: moveData.code_no,
    name: moveData.name,
    imageUrl: moveData.image_url
  }));

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
    <Header>Moves</Header>
    <Body>
      <FlatList
        data={moves}
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
