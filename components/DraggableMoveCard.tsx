import { UNDEFINED_MOVE_IMAGE_URL } from "@/shared/constants";
import { Image } from "expo-image";
import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { DerivedValue } from "react-native-reanimated";
import SwipeableItem from "react-native-swipeable-item";
import { ThemedText } from "./typography/ThemedText";

 
export type MoveItem = {
    key: string; // Combo ID
    label: string; // Combo name
    imageUrl?: string;
    rank: number;
};

interface DraggableMoveCardProps {
  item: MoveItem,
  drag: (event: GestureResponderEvent) => void,
  handleDelete: () => void,
}

export function DraggableMoveCard({
  item,
  drag,
  handleDelete
}: DraggableMoveCardProps) {
    return (
      <SwipeableItem
        key={item.key}
        item={item}
        snapPointsLeft={[80]} // Enable left swipe with a snap point of 80 pixels
        renderUnderlayLeft={({ percentOpen }) => (
          <DeleteMove percentOpen={percentOpen} handleDelete={handleDelete} />
        )}
      >
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
                        source={{ uri: item.imageUrl ?? UNDEFINED_MOVE_IMAGE_URL }}
                        style={styles.cardImage}
                    />
                </View>
                <View style={styles.cardContent}>
                    <ThemedText type="strong">{item.label}</ThemedText>
                </View>
              </View>
          </View>
        </TouchableOpacity>
      </SwipeableItem>
    )
}

function DeleteMove({ percentOpen, handleDelete }: {
  percentOpen: DerivedValue<number>,
  handleDelete: () => void
}) {
  return (
      <TouchableOpacity onPress={handleDelete} style={styles.underlayLeft}>
        <View>
          <Image
            source={require('@/assets/svg/trash.svg')}
            style={styles.dragIcon}
            />
        </View>
      </TouchableOpacity>
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
  

  underlayLeft: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    flex: 1,
  },
})