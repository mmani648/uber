import { Stack } from 'expo-router';

export default function DriverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="earnings" />
      <Stack.Screen name="history" />
      <Stack.Screen name="shift" />
    </Stack>
  );
}