import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Btn, Card, Chip, Stars } from '../src/components/ui';
import { DOCTORS, REVIEWS } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Doctor() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const r = useRouter();
  const [tab, setTab] = useState<'overview' | 'reviews'>('overview');
  const d = DOCTORS.find((x) => String(x.id) === id) ?? DOCTORS[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Doctor Details" />
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        <View style={{ alignItems: 'center' }}>
          <View style={s.av}><Ionicons name="person" size={30} color={c.secondary} /></View>
          <Text style={[t.h2, { marginTop: 8 }]}>{d.name}</Text>
          <Text style={t.small}>{d.specialty}</Text>
          <View style={{ marginTop: 6 }}><Stars value={d.rating} size={15} /></View>
          <Text style={[t.tiny, { color: c.ok, marginTop: 6 }]}>● {d.available}</Text>
        </View>

        <View style={s.seg}>
          {(['overview', 'reviews'] as const).map((k) => (
            <Pressable key={k} onPress={() => setTab(k)} style={[s.segBtn, tab === k && s.on]}>
              <Text style={[t.small, tab === k && { color: c.onPrimary }]}>
                {k === 'overview' ? 'Overview' : 'Reviews'}
              </Text>
            </Pressable>
          ))}
        </View>

        {tab === 'overview' ? (
          <>
            <Text style={[t.h3, { marginBottom: 6 }]}>Bio</Text>
            <Text style={[t.small, { lineHeight: 20 }]}>{d.bio}</Text>

            <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>Experience</Text>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Chip icon="ribbon-outline" label={`${d.experience} experience`} />
              <Chip icon="flash-outline" label="Laser Treatments" />
              <Chip icon="sparkles-outline" label="Skin Rejuvenation" />
            </View>

            <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>Branches</Text>
            {d.branches.map((b) => (
              <View key={b} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <Ionicons name="location-outline" size={15} color={c.secondary} />
                <Text style={t.small}>{b}</Text>
              </View>
            ))}
          </>
        ) : (
          <>
            <Card style={{ marginBottom: S.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: S.lg }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 26, color: c.primary }}>{d.rating}</Text>
                  <Text style={t.tiny}>Rating</Text>
                </View>
                <View style={{ flex: 1, gap: 3 }}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <View key={n} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={t.tiny}>{n}</Text>
                      <Ionicons name="star" size={9} color={c.star} />
                      <View style={s.track}>
                        <View style={[s.trackFill, { width: n === 5 ? '85%' : n === 4 ? '12%' : '3%' }]} />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </Card>
            {REVIEWS.map((v) => (
              <Card key={v.id} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={s.dot}><Ionicons name="person" size={13} color={c.secondary} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={t.body}>{v.name}</Text>
                    <Text style={t.tiny}>{v.date}</Text>
                  </View>
                  <Stars value={v.stars} size={11} />
                </View>
                <Text style={[t.small, { marginTop: 8, lineHeight: 18 }]}>{v.text}</Text>
              </Card>
            ))}
          </>
        )}

        <Btn label="Book an Appointment" style={{ marginTop: S.lg }}
          onPress={() => r.push('/booking')} />
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  av: { width: 76, height: 76, borderRadius: 38, backgroundColor: c.header,
        alignItems: 'center', justifyContent: 'center' },
  seg: { flexDirection: 'row', backgroundColor: c.header, borderRadius: R.pill,
         marginVertical: S.lg },
  segBtn: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: R.pill },
  on: { backgroundColor: c.primary },
  track: { flex: 1, height: 5, backgroundColor: c.header, borderRadius: 3, overflow: 'hidden' },
  trackFill: { height: '100%', backgroundColor: c.secondary },
  dot: { width: 28, height: 28, borderRadius: 14, backgroundColor: c.header,
         alignItems: 'center', justifyContent: 'center' },
});
