
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { PlusButton } from './PlusButton';

export function AddComboCard() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const cardStyle = isDarkMode ? styles.card : { ...styles.card, backgroundColor: 'rgba(182, 180, 202, 0.38)' };
  
  const handlePress = () => {
    router.push({
      pathname: `/combo/edit`,
    });
  }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={cardStyle}>
                <View style={styles.cardContent}>
                    <PlusButton onPress={handlePress}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(38, 31, 39, 0.5)",
    borderRadius: 6,
  },
  cardContent: {
    justifyContent: "center"
  },
});
