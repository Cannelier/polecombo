import { MoveFromComboQueryResponse } from "@/src/api/combos";
import React from 'react';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { CARD_HEIGHT, MoveCard } from "@/components/MoveCard";

export const SNAP_INTERVAL = CARD_HEIGHT + 20;


export function ScrollableMoveCard({
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
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            distanceFromCenter,
            [-SNAP_INTERVAL, 0, SNAP_INTERVAL],
            [0.6, 1, 0.6],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
  });

    return (
        <Animated.View style={animatedStyle}>
            <MoveCard move={move}/>
        </Animated.View>
    );
}
