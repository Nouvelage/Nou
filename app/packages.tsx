import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Head } from '../src/components/Head';
import { OFFERS } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Packages() {
  const r = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Packages" />
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {OFFERS.map((p) => (
          <Pressable key={p.id} style={s.card}
            onPress={() => r.push({ pathname: '/package', params: { id: String(p.id) } })}>
            <Text style={s.title}>{p.name}</Text>
            <View style={{ flexDirection: 'row', gap: 18, marginTop: 8 }}>
              {[['00', 'days'], ['12', 'Hours'], ['08', 'Minutes']].map(([n, l]) => (
                <View key={l} style={{ alignItems: 'center' }}>
                  <Text style={{ color: c.onPrimary, fontSize: 16 }}>{n}</Text>
                  <Text style={{ color: c.onPrimary, opacity: 0.7, fontSize: 10 }}>{l}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <Text style={{ color: c.onPrimary, fontSize: 18 }}>{p.price.toLocaleString()} EGP</Text>
              <Text style={{ color: '#D98A8A', fontSize: 13, textDecorationLine: 'line-through' }}>
                {p.wasPrice?.toLocaleString()} EGP
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  card: { backgroundColor: c.primary, borderRadius: R.lg, padding: S.lg, marginBottom: S.md },
  title: { color: c.onPrimary, fontSize: 17, fontWeight: '600' },
});
