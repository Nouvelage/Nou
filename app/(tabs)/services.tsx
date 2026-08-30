import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, SERVICES } from '../../src/data/demo';
import { Empty } from '../../src/components/ui';
import { c, R, S, t } from '../../src/theme';

export default function Services() {
  const r = useRouter();
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const hits = term ? SERVICES.filter((x) => x.name.toLowerCase().includes(term)) : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <View style={s.head}>
        <Text style={t.h2}>Services</Text>
        <Text style={[t.small, { marginTop: 4, marginBottom: 12 }]}>Explore Our treatment categories</Text>
        <View style={s.search}>
          <TextInput style={{ flex: 1, fontSize: 14, color: c.primary }} value={q} onChangeText={setQ}
            placeholder="Search Services" placeholderTextColor={c.muted} />
          <Ionicons name="search" size={17} color={c.muted} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {term ? (
          hits.length === 0 ? <Empty title="Nothing matched" note="Try a different word." /> :
          hits.map((x) => (
            <Pressable key={x.id} style={s.row}
              onPress={() => r.push({ pathname: '/service', params: { id: String(x.id) } })}>
              <View style={s.thumb}><Ionicons name="sparkles" size={20} color={c.secondary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={t.body}>{x.name}</Text>
                <Text style={[t.tiny, { marginTop: 2 }]}>from {x.price.toLocaleString()} EGP · {x.duration}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={s.grid}>
            {CATEGORIES.map((x) => (
              <Pressable key={x.key} style={s.tile}
                onPress={() => r.push({ pathname: '/category', params: { key: x.key, name: x.name } })}>
                <Ionicons name={x.icon as any} size={26} color={c.primary} />
                <Text style={[t.body, { marginTop: 8 }]}>{x.name}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  head: { backgroundColor: c.header, padding: S.lg },
  search: { height: 44, borderRadius: R.pill, backgroundColor: c.bg, paddingHorizontal: 18,
            flexDirection: 'row', alignItems: 'center', gap: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: S.md },
  tile: { width: '47%', height: 108, backgroundColor: c.header, borderRadius: R.lg,
          alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: S.md, backgroundColor: c.surface,
         borderRadius: R.lg, borderWidth: 0.5, borderColor: c.border, padding: 12, marginBottom: 10 },
  thumb: { width: 48, height: 48, borderRadius: R.md, backgroundColor: c.header,
           alignItems: 'center', justifyContent: 'center' },
});
