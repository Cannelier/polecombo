import { Stack } from 'expo-router';

export default function NewMoveStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Nouvelle figure',
        headerShown: false,
        }} />
      <Stack.Screen name="customMove" options={{
        title: 'Custom figure',
        headerShown: false,
        }} />
    </Stack>
  );
}