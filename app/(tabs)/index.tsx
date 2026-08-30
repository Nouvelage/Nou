import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Bar, Card, Stars } from '../../src/components/ui';
import { useSession } from '../../src/data/session';
import { CATEGORIES, DOCTORS, MY_PACKAGES, OFFERS, SERVICES, SESSIONS } from '../../src/data/demo';
import { c, R, S, t } from '../../src/theme';

export default function Home() {
  const { me } = useSession();
  const r = useRouter();
  const next = SESSIONS.find((x) => x.state === 'upcoming')!;
  const pkg = MY_PACKAGES[0];
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.head}>
          <View style={{ flex: 1 }}>
            <Text style={t.h2}>{greet}, {me.name.split(' ')[0]} 👋</Text>
            <Text style={[t.small, { marginTop: 4 }]}>Your next session is in 2 days</Text>
          </View>
          <Pressable onPress={() => r.push('/notifications')} style={s.bell}>
            <Ionicons name="notifications-outline" size={18} color={c.onPrimary} />
          </Pressable>
        </View>

        <View style={{ padding: S.lg }}>
          <Text style={[t.h3, { marginBottom: 8 }]}>Upcoming Appointment</Text>
          <Pressable style={s.hero} onPress={() => r.push('/(tabs)/sessions')}>
            <Text style={s.heroMeta}>{next.doctor}</Text>
            <Text style={s.heroTitle}>{next.service}</Text>
            <View style={{ flexDirection: 'row', gap: S.lg, marginTop: 4 }}>
              <Text style={s.heroMeta}>🗓  {next.date}</Text>
              <Text style={s.heroMeta}>🕐  {next.time}</Text>
            </View>
          </Pressable>

          <View style={s.cats}>
            {CATEGORIES.slice(0, 5).map((x) => (
              <Pressable key={x.key} style={{ alignItems: 'center', gap: 5 }}
                onPress={() => r.push({ pathname: '/category', params: { key: x.key, name: x.name } })}>
                <View style={s.catIcon}><Ionicons name={x.icon as any} size={20} color={c.primary} /></View>
                <Text style={t.tiny}>{x.name}</Text>
              </Pressable>
            ))}
          </View>

          <Row title="Popular Treatments" onPress={() => r.push('/(tabs)/services')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: S.lg }}>
            {SERVICES.slice(0, 4).map((x) => (
              <Pressable key={x.id} style={s.treat}
                onPress={() => r.push({ pathname: '/service', params: { id: String(x.id) } })}>
                <View style={s.treatImg}><Ionicons name="sparkles" size={26} color={c.secondary} /></View>
                <Text style={[t.body, { marginTop: 8 }]} numberOfLines={1}>{x.name}</Text>
                <Text style={[t.tiny, { marginTop: 2 }]} numberOfLines={1}>{x.blurb}</Text>
                <Text style={[t.small, { marginTop: 6, color: c.primary }]}>
                  from {x.price.toLocaleString()} EGP
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Row title="Offers ending Soon" onPress={() => r.push('/packages')} />
          <Pressable style={s.offer} onPress={() => r.push('/packages')}>
            <Text style={s.offerTitle}>{OFFERS[0].name}</Text>
            <View style={{ flexDirection: 'row', gap: 18, marginTop: 8 }}>
              {[['00', 'days'], ['12', 'Hours'], ['08', 'Minutes']].map(([n, l]) => (
                <View key={l} style={{ alignItems: 'center' }}>
                  <Text style={{ color: c.onPrimary, fontSize: 17 }}>{n}</Text>
                  <Text style={{ color: c.onPrimary, opacity: 0.7, fontSize: 10 }}>{l}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <Text style={{ color: c.onPrimary, fontSize: 18 }}>{OFFERS[0].price} EGP</Text>
              <Text style={{ color: '#D98A8A', fontSize: 14, textDecorationLine: 'line-through' }}>
                {OFFERS[0].wasPrice} EGP
              </Text>
            </View>
          </Pressable>

          <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>Your Package</Text>
          <Card>
            <Text style={t.body}>{pkg.name}</Text>
            <Text style={[t.small, { marginTop: 4, marginBottom: 10 }]}>
              Expires {pkg.expires} · paid in full
            </Text>
            <Bar value={pkg.pulsesLeft} max={pkg.pulsesTotal} />
            <Text style={[t.small, { marginTop: 7 }]}>
              {pkg.pulsesLeft.toLocaleString()} of {pkg.pulsesTotal.toLocaleString()} pulses left
            </Text>
          </Card>

          <Row title="Top Doctors" onPress={() => r.push('/doctors')} />
          <View style={s.docGrid}>
            {DOCTORS.slice(0, 4).map((d) => (
              <Pressable key={d.id} style={s.docCard}
                onPress={() => r.push({ pathname: '/doctor', params: { id: String(d.id) } })}>
                <View style={s.avatar}><Ionicons name="person" size={22} color={c.secondary} /></View>
                <Text style={[t.body, { marginTop: 6, textAlign: 'center' }]} numberOfLines={1}>{d.name}</Text>
                <Text style={[t.tiny, { textAlign: 'center' }]} numberOfLines={1}>{d.specialty}</Text>
                <View style={{ marginTop: 4 }}><Stars value={d.rating} /></View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: S.lg, marginBottom: 8 }}>
      <Text style={[t.h3, { flex: 1 }]}>{title}</Text>
      <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={t.small}>View all</Text>
        <Ionicons name="chevron-forward" size={14} color={c.secondary} />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  head: { backgroundColor: c.header, padding: S.lg, flexDirection: 'row', gap: S.md },
  bell: { width: 36, height: 36, borderRadius: 18, backgroundColor: c.primary,
          alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: c.primary, borderRadius: R.lg, padding: S.lg },
  heroTitle: { color: c.onPrimary, fontSize: 17, marginTop: 6 },
  heroMeta: { color: c.onPrimary, opacity: 0.75, fontSize: 12 },
  cats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: S.lg },
  catIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: c.header,
             alignItems: 'center', justifyContent: 'center' },
  treat: { width: 190, marginRight: S.md, backgroundColor: c.surface, borderRadius: R.lg,
           borderWidth: 0.5, borderColor: c.border, padding: 10 },
  treatImg: { height: 92, borderRadius: R.md, backgroundColor: c.header,
              alignItems: 'center', justifyContent: 'center' },
  offer: { backgroundColor: c.primary, borderRadius: R.lg, padding: S.lg },
  offerTitle: { color: c.onPrimary, fontSize: 18, fontWeight: '600' },
  docGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: S.md },
  docCard: { width: '47%', backgroundColor: c.surface, borderRadius: R.lg, borderWidth: 0.5,
             borderColor: c.border, padding: 12, alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: c.header,
            alignItems: 'center', justifyContent: 'center' },
});
