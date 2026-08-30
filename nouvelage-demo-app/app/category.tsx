import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Empty } from '../src/components/ui';
import { SERVICES } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Category() {
  const { key, name } = useLocalSearchParams<{ key: string; name: string }>();
  const r = useRouter();
  const list = SERVICES.filter((x) => x.category === key);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title={`${name} Services`} />
      <View style={{ padding: S.lg, paddingBottom: 0 }}>
        <View style={s.search}>
          <TextInput style={{ flex: 1, fontSize: 14, color: c.primary }}
            placeholder="Search Services" placeholderTextColor={c.muted} />
          <Ionicons name="search" size={17} color={c.muted} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {list.length === 0 ? <Empty title="No services in this category yet" /> : list.map((x) => (
          <Pressable key={x.id} style={s.card}
            onPress={() => r.push({ pathname: '/service', params: { id: String(x.id) } })}>
            <View style={s.img}><Ionicons name="sparkles" size={26} color={c.secondary} /></View>
            <View style={{ padding: 12 }}>
              <Text style={[t.body, { fontSize: 15 }]}>{x.name}</Text>
              <Text style={[t.tiny, { marginTop: 3 }]}>{x.blurb}</Text>
              <View style={{ flexDirection: 'row', gap: S.md, marginTop: 8 }}>
                <Text style={t.small}>from {x.price.toLocaleString()} EGP</Text>
                <Text style={t.small}>· {x.duration}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  search: { height: 44, borderRadius: R.pill, backgroundColor: c.header, paddingHorizontal: 18,
            flexDirection: 'row', alignItems: 'center', gap: 8 },
  card: { backgroundColor: c.surface, borderRadius: R.lg, borderWidth: 0.5, borderColor: c.border,
          marginBottom: S.md, overflow: 'hidden' },
  img: { height: 130, backgroundColor: c.header, alignItems: 'center', justifyContent: 'center' },
});
