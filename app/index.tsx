import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { c, t } from '../src/theme';

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => router.replace('/onboarding'), 1400);
    return () => clearTimeout(id);
  }, []);
  return (
    <View style={s.wrap}>
      <Text style={s.logo}>nouvelage</Text>
      <Text style={[t.tiny, { letterSpacing: 3, marginTop: 2 }]}>AESTHETIC CLINICS</Text>
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center' },
  logo: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 38, color: c.primary },
});
