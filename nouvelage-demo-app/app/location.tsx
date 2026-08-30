import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Btn } from '../src/components/ui';
import { BRANCHES } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Location() {
  const r = useRouter();
  const [sel, setSel] = useState(BRANCHES[0].id);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Location" />
      <View style={s.map}>
        <Ionicons name="location" size={30} color={c.primary} />
        <Text style={[t.tiny, { marginTop: 6 }]}>Map view</Text>
      </View>
      <View style={{ padding: S.lg, flex: 1 }}>
        <View style={s.search}>
          <TextInput style={{ flex: 1, fontSize: 14, color: c.primary }}
            placeholder="Search" placeholderTextColor={c.muted} />
          <Ionicons name="search" size={17} color={c.muted} />
        </View>
        <ScrollView style={{ marginTop: S.md }}>
          {BRANCHES.map((b) => (
            <Pressable key={b.id} onPress={() => setSel(b.id)}
              style={[s.row, sel === b.id && { borderColor: c.primary, borderWidth: 1.2 }]}>
              <Ionicons name="location-outline" size={16} color={c.secondary} />
              <View style={{ flex: 1 }}>
                <Text style={t.body}>{b.name}</Text>
                <Text style={t.tiny}>{b.area}</Text>
              </View>
              {sel === b.id ? <Ionicons name="checkmark-circle" size={17} color={c.primary} /> : null}
            </Pressable>
          ))}
        </ScrollView>
        <Btn label="Continue" onPress={() => r.back()} />
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  map: { height: 180, backgroundColor: c.header, alignItems: 'center', justifyContent: 'center' },
  search: { height: 44, borderRadius: R.pill, backgroundColor: c.header, paddingHorizontal: 18,
            flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: c.surface,
         borderWidth: 0.5, borderColor: c.border, borderRadius: R.md, padding: 12, marginBottom: 8 },
});
