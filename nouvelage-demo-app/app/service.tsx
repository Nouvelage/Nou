import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Btn, Card, Chip, Stars } from '../src/components/ui';
import { REVIEWS, SERVICES } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Service() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const r = useRouter();
  const x = SERVICES.find((v) => String(v.id) === id) ?? SERVICES[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title={x.name} />
      <ScrollView contentContainerStyle={{ paddingBottom: S.xl }}>
        <View style={s.hero}><Ionicons name="sparkles" size={44} color={c.secondary} /></View>

        <View style={{ padding: S.lg }}>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {x.longevity ? <Chip icon="time-outline" label={x.longevity} /> : null}
            <Chip icon="pricetag-outline" label={`from ${x.price.toLocaleString()} EGP`} />
            <Chip icon="hourglass-outline" label={x.duration} />
          </View>

          <Text style={[t.small, { marginTop: S.lg, lineHeight: 20 }]}>{x.blurb}</Text>

          <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>Benefits</Text>
          {['Smooths forehead and expression lines', 'Prevents deeper wrinkles over time',
            'Natural-looking results'].map((b) => (
            <View key={b} style={s.benefit}>
              <Ionicons name="checkmark-circle" size={15} color={c.secondary} />
              <Text style={t.small}>{b}</Text>
            </View>
          ))}

          <Btn label="Book an Appointment" style={{ marginTop: S.lg }}
            onPress={() => r.push({ pathname: '/booking', params: { service: x.name } })} />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: S.xl, marginBottom: 8 }}>
            <Text style={[t.h3, { flex: 1 }]}>Reviews</Text>
            <Text style={t.small}>4.9 · {REVIEWS.length} reviews</Text>
          </View>
          {REVIEWS.map((v) => (
            <Card key={v.id} style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={s.dot}><Ionicons name="person" size={14} color={c.secondary} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={t.body}>{v.name}</Text>
                  <Text style={t.tiny}>{v.date}</Text>
                </View>
                <Stars value={v.stars} size={12} />
              </View>
              <Text style={[t.small, { marginTop: 8, lineHeight: 18 }]}>{v.text}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  hero: { height: 180, backgroundColor: c.header, alignItems: 'center', justifyContent: 'center' },
  benefit: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  dot: { width: 30, height: 30, borderRadius: 15, backgroundColor: c.header,
         alignItems: 'center', justifyContent: 'center' },
});
