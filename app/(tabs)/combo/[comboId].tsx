import { Header } from '@/components/grid/Header';
import { Spacer } from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/typography/ThemedText';
import { useComboQuery } from '@/src/queries/useComboQuery';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";




export default function EditCombo() {
  const { comboId } = useLocalSearchParams<{comboId: string}>();
  const { user } = useUser()
  const { data: combo, isLoading: isComboLoading } = useComboQuery(Number(comboId));

  type Item = {
    key: string;
    label: string;
    imageUrl: string;
  };

  const [moves, setMoves] = useState<Item[] | undefined>([])

  // Set moves once loaded
  useEffect(() => {
    if (combo?.moves) {
      setMoves(
        combo.moves.map((move) => {
          return {
            key: String(move.moveId),
            label: move.name,
            imageUrl: move.image_url
          }
        }))
      }
  },[combo])
  
  const renderItem = useCallback(
    ({ item, index, drag, isActive}: RenderItemParams<Item>) => {
      console.log(item.imageUrl)
      return (

        <TouchableOpacity onLongPress={drag}>
            <View style={styles.cardContent}>
                <View style={styles.cardImage}>
                    <Image
                        source={{ uri: "../../../assets/images/moves/F1.png" }}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <View style={styles.cardName}>
                    <ThemedText>{item.label}</ThemedText>
                </View>
            </View>
          </TouchableOpacity>
      )
    }
    ,[]
  )

  if (!combo || isComboLoading || !moves) {
    return
  }
  
  return (
    <>
      <SignedIn>
          <ThemedView style={styles.titleContainer}>
            <Header>Mes combos</Header>
            <DraggableFlatList
              data={moves}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggableItem-${item.key}`}
              onDragEnd={({ data }) => { setMoves(data) }}
            />
            <Spacer/>
          </ThemedView>
      </SignedIn>


      <SignedOut>
      <Link href="/(auth)/signIn">
        <Text>Sign in</Text>
      </Link>
      <Link href="/(auth)/signUp">
        <Text>Sign up</Text>
      </Link>
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
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
});