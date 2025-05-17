import { MoveFromComboQueryResponse } from "@/src/api/combos";
import { StyleSheet, TouchableOpacity, View, } from "react-native";
import { ThemedText } from "./typography/ThemedText";
import React from "react";
import { Image } from 'react-native';

export function DraggableMoveCard({ move, drag }: { move: MoveFromComboQueryResponse, drag: }) {
    return (
      <TouchableOpacity>
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardImage}>
                    <Image
                        source={{ uri: move.image_url }}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <View style={styles.cardName}>
                    <ThemedText>{move.name}</ThemedText>
                </View>
            </View>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "pink",
    height: 100
  },
  cardContent: {
    padding: 5,
    flexDirection: "row"
  },
  cardImage: {
    flex: 1
  },
  cardName: {
    flex: 2
  }
})