import { Stack } from 'expo-router';

export default function ComboStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Mes Combos',
        }} />
      <Stack.Screen name="[comboId]" options={{
        title: 'Combo',
        }} />
      <Stack.Screen name="edit" options={{
        title: 'Modifier Combo',
        }} />
      <Stack.Screen name="addMove" options={{
        title: 'Nouvelle figure',
        }} />
    </Stack>
  );
}