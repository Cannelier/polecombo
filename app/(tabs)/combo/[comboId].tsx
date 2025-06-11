import { useAuth } from "@/components/auth/AuthProvider";
import { Body } from "@/components/grid/Body";
import { Header } from "@/components/grid/Header";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/typography/ThemedText";
import { useComboQuery } from "@/frontend/hooks/useComboQuery";
import { MoveFromComboQueryResponse } from "@/src/api/combos";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from 'react';
import { ActivityIndicator, Button, Dimensions, StyleSheet } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';


const { height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.40;
const SNAP_INTERVAL = CARD_HEIGHT + 20;
const CARD_IMAGE_HEIGHT = CARD_HEIGHT * 0.70

export default function FullViewCombo() {
    const { comboId } = useLocalSearchParams<{ comboId: string }>();
    const { userId, isUserLoading } = useAuth();
    const { data: comboData, isLoading: isComboDataLoading } = useComboQuery(Number(comboId))
    const moves = comboData?.movesInCombo;

    // Animation

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
        },
    });
    
    if (!comboData || isComboDataLoading || isUserLoading) {
        return <ActivityIndicator/>
    }
    const handlePress = () => router.navigate({
        pathname: `/combo/edit/${comboId}`
    })

  return (
      <Body>
        <Header>{comboData.name.toUpperCase()}</Header>
        <Button
            title={"Edit"}
            onPress={handlePress}
        />
        <ThemedView>
            <Animated.FlatList
                data={moves}
                keyExtractor={(item, index) => `${item.rank}-${index}`}
                renderItem={({ item, index }) => (
                    <MoveCard move={item} index={index} scrollY={scrollY} />
                )}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={SNAP_INTERVAL}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
            />


        </ThemedView>

    </Body>
  )
}

function MoveCard({
    move,
    index,
    scrollY
}: {
    move: MoveFromComboQueryResponse,
    index: number,
    scrollY: any,
}) {
    const animatedStyle = useAnimatedStyle(() => {
    const position = index * SNAP_INTERVAL;
    const distanceFromCenter = scrollY.value - position;

    const scale = interpolate(
      distanceFromCenter,
      [-SNAP_INTERVAL, 0, SNAP_INTERVAL],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      distanceFromCenter,
      [-SNAP_INTERVAL, 0, SNAP_INTERVAL],
      [0.6, 1, 0.6],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            <Image source={{ uri: move.imageUrl }} style={{ width: CARD_IMAGE_HEIGHT, height: CARD_IMAGE_HEIGHT }} />
            <ThemedView style={styles.cardTitleContainer}>
                <ThemedText style={styles.cardTitle} type="title">
                    {move.displayName.toUpperCase()}
                </ThemedText>
            </ThemedView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 30
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  cardTitleContainer: {
    marginTop: 20,
  },
  cardTitle: {
    color: "grey",
    textAlign: "center",
  },
  contentContainerStyle: {
    paddingTop: 40,
    paddingBottom: height * 0.5
  }
});