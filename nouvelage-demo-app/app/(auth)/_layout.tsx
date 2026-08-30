import { Stack } from 'expo-router';
import { c } from '../../src/theme';
export default function L() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }} />;
}
