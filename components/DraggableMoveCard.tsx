import { Image } from "expo-image";
import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
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
          <View style={styles.cardContainer}>
              <View style={styles.cardRow}>
                <View style={styles.cardDrag}>
                  <Image
                    source={require('@/assets/svg/drag.svg')}
                    style={styles.dragIcon}
                    />
                </View>
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
          </View>
        </TouchableOpacity>
      </>
    )
}



const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 5,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDrag: {
    width: 40,
    alignItems: "center",
  },
  cardImageContainer: {
    width: 75,
    height: 75,
    marginHorizontal: 10,
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardImage: { 
    width: 75,
    height: 75,
    borderRadius: 4,
  },
  dragIcon: {
    width: 24,
    height: 24,
  },
  

})