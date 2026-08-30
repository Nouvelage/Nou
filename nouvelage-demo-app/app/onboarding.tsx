import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Btn } from '../src/components/ui';
import { c, S, t } from '../src/theme';

const SLIDES = [
  { icon: 'calendar-outline', title: 'Book Your Treatments Easily',
    body: 'Choose the services you need and book your appointment in just a few simple steps.' },
  { icon: 'cube-outline', title: 'Smart Packages Just For You',
    body: 'Book multi-session packages at better prices and track each session.' },
  { icon: 'gift-outline', title: 'Track Your Sessions and Earn Rewards',
    body: 'Stay on top of your upcoming sessions and earn loyalty points you can use.' },
] as const;

export default function Onboarding() {
  const [i, setI] = useState(0);
  const r = useRouter();
  const last = i === SLIDES.length - 1;
  return (
    <SafeAreaView style={s.wrap}>
      <Pressable onPress={() => r.replace('/(auth)/login')} style={{ alignSelf: 'flex-end', padding: 8 }}>
        <Text style={t.small}>Skip</Text>
      </Pressable>
      <View style={s.body}>
        <View style={s.badge}><Ionicons name={SLIDES[i].icon as any} size={42} color={c.primary} /></View>
        <Text style={[t.h1, { textAlign: 'center', marginBottom: S.md }]}>{SLIDES[i].title}</Text>
        <Text style={[t.small, { textAlign: 'center', lineHeight: 20, paddingHorizontal: S.lg }]}>
          {SLIDES[i].body}
        </Text>
      </View>
      <View style={s.dots}>
        {SLIDES.map((_, n) => <View key={n} style={[s.dot, n === i && s.on]} />)}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: S.md }}>
        {i > 0 ? (
          <Pressable onPress={() => setI(i - 1)} style={s.back}>
            <Ionicons name="chevron-back" size={20} color={c.primary} />
          </Pressable>
        ) : null}
        <View style={{ flex: 1 }}>
          <Btn label={last ? 'Get Started' : 'Next'}
            onPress={() => (last ? r.replace('/(auth)/register') : setI(i + 1))} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: c.bg, padding: S.xl },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  badge: { width: 100, height: 100, borderRadius: 50, backgroundColor: c.header,
           alignItems: 'center', justifyContent: 'center', marginBottom: S.xl },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: S.xl },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: c.borderStrong },
  on: { backgroundColor: c.primary, width: 22 },
  back: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: c.primary,
          alignItems: 'center', justifyContent: 'center' },
});
