
import { Combo } from '@/src/hooks/useCombosQuery';

import { ThemedText } from '@/components/typography/ThemedText';
import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export function ComboCard({combo}: {combo: Combo}) {
const handlePress = () => {
  router.push({
    pathname: `/combo/${combo.id}`
  });
}

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.cardImageContainer}>
                  <Image
                    source={require('@/assets/images/moves/F1.png')}
                    style={styles.cardImage} />
                </View>
                <View style={styles.cardContent}>
                    <ThemedText type="strong">{combo.name}</ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  card: {
    height: 50,
    justifyContent: "center",
    flexDirection: "row",

    backgroundColor: "rgba(122, 125, 166, 0.1)",
    borderRadius: 7
  },
  cardImageContainer: {
    flex: 1,
  },
  cardImage: {
    height:50,
    width:50,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  cardContent: {
    flex: 4,
    justifyContent: "center"
  },
});
