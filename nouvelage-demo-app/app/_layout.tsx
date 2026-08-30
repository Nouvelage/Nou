import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts, PlayfairDisplay_500Medium, PlayfairDisplay_600SemiBold,
} from '@expo-google-fonts/playfair-display';
import { SessionProvider } from '../src/data/session';
import { c } from '../src/theme';

export default function Root() {
  const [loaded] = useFonts({ PlayfairDisplay_500Medium, PlayfairDisplay_600SemiBold });
  if (!loaded) return null;
  return (
    <SessionProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }} />
    </SessionProvider>
  );
}
