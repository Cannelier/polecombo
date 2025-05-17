
import { Combo } from '@/src/queries/useCombosQuery';

import { ThemedText } from '@/components/typography/ThemedText';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

export function ComboCard({combo}: {combo: Combo}) {
const handlePress = () => {};

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
    flex: 1,
    backgroundColor: "#EEEEEE",
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
