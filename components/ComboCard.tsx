
import { Combo } from '@/app/queries/useCombosQuery';

import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View } from 'react-native';

export function ComboCard({combo}: {combo: Combo}) {
    return (
        <View style={styles.card}>
            <ThemedText>{combo.name}</ThemedText>
        </View>
    )
}


const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 390,
  },
});
