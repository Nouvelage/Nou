import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { DOCTORS } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Doctors() {
  const r = useRouter();
  const [q, setQ] = useState('');
  const list = DOCTORS.filter((d) => d.name.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Doctors" />
      <View style={{ padding: S.lg, paddingBottom: 0 }}>
        <View style={s.search}>
          <TextInput style={{ flex: 1, fontSize: 14, color: c.primary }} value={q} onChangeText={setQ}
            placeholder="Search doctor" placeholderTextColor={c.muted} />
          <Ionicons name="search" size={17} color={c.muted} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {list.map((d) => (
          <Pressable key={d.id} style={s.row}
            onPress={() => r.push({ pathname: '/doctor', params: { id: String(d.id) } })}>
            <View style={s.av}><Ionicons name="person" size={20} color={c.secondary} /></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={t.body}>{d.name}</Text>
                {d.topRated ? <View style={s.top}><Text style={{ fontSize: 9, color: c.onPrimary }}>Top Rated</Text></View> : null}
              </View>
              <Text style={t.tiny}>{d.specialty}</Text>
              <Text style={[t.tiny, { color: c.ok, marginTop: 3 }]}>● {d.available}</Text>
            </View>
            <Text style={t.small}>{d.rating}</Text>
            <Ionicons name="star" size={13} color={c.star} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  search: { height: 44, borderRadius: R.pill, backgroundColor: c.header, paddingHorizontal: 18,
            flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: c.surface,
         borderWidth: 0.5, borderColor: c.border, borderRadius: R.lg, padding: 12, marginBottom: 8 },
  av: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.header,
        alignItems: 'center', justifyContent: 'center' },
  top: { backgroundColor: c.primary, borderRadius: R.pill, paddingHorizontal: 7, paddingVertical: 2 },
});
