import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/typography/ThemedText";
import { Image } from "expo-image";
import React from 'react';
import { Dimensions, StyleSheet } from "react-native";

interface MoveCardProps {
    move: {
        displayName: string;
        imageUrl: string;
    }
};

const { height } = Dimensions.get('window');
export const CARD_HEIGHT = height * 0.40;
export const CARD_IMAGE_HEIGHT = CARD_HEIGHT * 0.70

export function MoveCard({
    move
}: MoveCardProps) {
    const title = move.displayName.length > 19 ?
        move.displayName.slice(0, 19) + '...' :
        move.displayName;

    return (
        <ThemedView style={styles.card}>
            <ThemedView style={styles.cardTitleContainer}>
                <ThemedText style={styles.cardTitle} type="title">
                    {title}
                </ThemedText>
            </ThemedView>
            <Image
                source={{ uri: move.imageUrl }}
                style={{
                    width: CARD_IMAGE_HEIGHT,
                    height: CARD_IMAGE_HEIGHT
                }}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    width: '90%',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(236, 232, 239)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  cardTitleContainer: {
    marginVertical: 15,
    height: 40,
    width: "100%",
    justifyContent: "center",
  },
  cardTitle: {
    color: "grey",
    textAlign: "center",
  },
});