
import { Combo } from '@/src/hooks/useCombosQuery';

import { ThemedText } from '@/components/typography/ThemedText';
import { router } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

export function ComboCard({combo}: {combo: Combo}) {
const handlePress = () => {
  router.push({
    pathname: `/combo/${combo.id}`
  });
}

    return (
        <TouchableHighlight onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <ThemedText style={styles.cardTitle}>{combo.name}</ThemedText>
                </View>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
  card: {
    height: 50,
    backgroundColor: "pink",
    justifyContent: "center"
  },
  cardContent: {
    padding: 10
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 16,
  }
});
