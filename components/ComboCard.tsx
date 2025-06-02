
import { ThemedText } from '@/components/typography/ThemedText';
import { ComboQueryResponse } from '@/src/api/combos';
import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export function ComboCard({combo}: {combo: ComboQueryResponse}) {
  const handlePress = () => {
    router.push({
      pathname: `/combo/${combo.comboId}`,
      params: { initialCombo: JSON.stringify(combo)}//TODO: Add combo with moves
    });
  }

  const moves = combo.movesInCombo.slice(0,3);
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <ThemedText type="strong">{combo.name.toUpperCase()}</ThemedText>
                </View>
                <View style={styles.cardImageContainer}>
                  {moves.map((move) => {
                    return (
                      <Image
                      source={{ uri: move.imageUrl }}
                      style={styles.cardImage}
                      key={move.moveId}/>
                  )
                  })}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  card: {
    height: 125,
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(38, 31, 39, 0.5)",
    borderRadius: 6,
  },
  cardImageContainer: {
    flexDirection: "row",
    gap: 5,
    flex: 1,
  },
  cardImage: {
    height: 75,
    width: 75,
    borderRadius: 4,
  },
  cardContent: {
    justifyContent: "center"
  },
});
