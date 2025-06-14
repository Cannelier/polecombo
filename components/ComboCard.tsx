
import { LevelBadge } from '@/components/LevelBadge';
import { MoveStyleBadge } from '@/components/MoveStyleBadge';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/typography/ThemedText';
import { ComboQueryResponse } from '@/src/api/combos';
import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

export function ComboCard({combo}: {combo: ComboQueryResponse}) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const cardStyle = isDarkMode ? styles.card : { ...styles.card, backgroundColor: 'rgba(182, 180, 202, 0.38)' };
  
  const handlePress = () => {
    router.push({
      pathname: `/combo/${combo.comboId}`,
    });
  }

  const moves = combo.movesInCombo.slice(0,3);
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={cardStyle}>
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
                <ThemedView style={styles.badgesContainer}>
                      <LevelBadge level={combo.level}/>
                  {
                      combo.styles.map((comboStyle, index) => (
                      <MoveStyleBadge moveStyle={comboStyle} key={index}/>
                  ))
                  }
                </ThemedView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(38, 31, 39, 0.5)",
    borderRadius: 6,
    paddingVertical: 5,
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
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  }
});
