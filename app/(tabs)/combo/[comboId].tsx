import { useAuth } from "@/components/auth/AuthProvider";
import { Body } from "@/components/grid/Body";
import { Header } from "@/components/grid/Header";
import { ScrollableMoveCard, SNAP_INTERVAL } from "@/components/ScrollableMoveCard";
import { ThemedView } from "@/components/ThemedView";
import { useComboQuery } from "@/frontend/hooks/useComboQuery";
import { router, useLocalSearchParams } from "expo-router";
import React from 'react';
import { ActivityIndicator, Button, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';


const { height } = Dimensions.get('window');

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
                    <ScrollableMoveCard move={item} index={index} scrollY={scrollY} />
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

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 40,
    paddingBottom: height * 0.4
  }
});