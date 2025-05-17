
import { Combo } from '@/app/queries/useCombosQuery';

import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/typography/ThemedText';

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
