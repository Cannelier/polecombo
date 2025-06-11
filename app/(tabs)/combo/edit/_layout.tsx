import { Stack } from 'expo-router';

export default function ComboStack() {
  return (
    <Stack>
      <Stack.Screen name="[comboId]" options={{
        title: 'Modifier Combo',
        headerShown: false
        }} />
    </Stack>
  );
}