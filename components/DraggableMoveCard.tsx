import React from "react";
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./typography/ThemedText";

 
export type MoveItem = {
    key: string; // Combo ID
    label: string; // Combo name
    imageUrl: string;
    codeNo: string;
    rank: number;
};

export function DraggableMoveCard({ item, drag, movesImagesDataset }: { item: MoveItem, drag: (event: GestureResponderEvent) => void, movesImagesDataset: any}) {
    return (
      <>
        <TouchableOpacity onLongPress={drag}>
            <View style={styles.card}>
                <View style={styles.cardImageContainer}>
                    <Image
                        source={movesImagesDataset[item.codeNo]}
                        style={styles.cardImage}
                    />
                </View>
                <View style={styles.cardContent}>
                    <ThemedText type="strong">{item.label}</ThemedText>
                </View>
            </View>
          </TouchableOpacity>
      </>
    )
}



const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cardImageContainer: {
    flex: 1,
  },
  cardImage: { 
    borderRadius: 4,
    width: 75,
    height: 75,
  },
  cardContent: {
    flex: 2,
    justifyContent: "center"
  },
})