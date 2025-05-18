import React from "react";
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./typography/ThemedText";

 
export type MoveItem = {
    key: string;
    label: string;
    imageUrl: string;
    codeNo: string;
};

export function DraggableMoveCard({ item, drag, movesImagesDataset }: { item: MoveItem, drag: (event: GestureResponderEvent) => void, movesImagesDataset: any}) {
    return (
        <TouchableOpacity onLongPress={drag}>
            <View style={styles.cardContent}>
                <View style={styles.cardImage}>
                    <Image
                        source={movesImagesDataset[item.codeNo]}
                        style={{ width: 75, height: 75 }}
                    />
                </View>
                <View style={styles.cardName}>
                    <ThemedText>{item.label}</ThemedText>
                </View>
            </View>
          </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
  cardContent: {
    padding: 5,
    flexDirection: "row"
  },
  cardImage: {
    flex: 1
  },
  cardName: {
    flex: 3
  }
})