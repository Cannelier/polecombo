import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/typography/ThemedText";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { Dimensions, StyleSheet } from "react-native";

interface MoveCardProps {
    move: {
        displayName: string;
        imageUrl: string;
        styles: string[];
    }
};

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
export const CARD_HEIGHT = height * 0.40;
export const CARD_WIDTH = width * 0.75;
export const CARD_IMAGE_HEIGHT = CARD_WIDTH * 0.85

export function MoveCard({
    move
}: MoveCardProps) {
    const title = move.displayName.length > 19 ?
        move.displayName.slice(0, 19) + '...' :
        move.displayName;

    return (
        <ThemedView style={styles.card}>
            <ThemedView style={styles.cardTitleContainer}>
                <LinearGradient
                    colors={[
                        'rgb(241, 237, 244)',       // Pure white (top-left)
                        'rgba(174, 155, 223, 0.1)',    // Soft lila (top-right)
                        'rgb(242, 237, 245)'     // Back to white (bottom)
                    ]}
                    locations={[0, 0.5, 0, 1]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                />
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
            <ThemedView>
                {
                    move.styles.map((moveStyle, index) => (
                        <Badge color="#FFFFFF" key={index}>
                            {moveStyle}
                        </Badge>
                ))
                }
            </ThemedView>
        </ThemedView>
    )
}

function Badge({ color, children }: { color: string, children: React.ReactNode }) {
    return (
        <ThemedView style={{ backgroundColor: color, padding: 5, borderRadius: 5, margin: 2 }}>
            <ThemedText style={{ color: 'black' }}>{children}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginVertical: 10,
    marginHorizontal: "auto",
    borderRadius: 10,
    backgroundColor: 'rgb(236, 232, 239)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 30,
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  cardTitleContainer: {
    height: 40,
    width: "100%",
    justifyContent: "center",
  },
  cardTitle: {
    color: "grey",
    textAlign: "center",
  },
});