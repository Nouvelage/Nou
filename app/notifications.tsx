import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { NOTIFICATIONS } from '../src/data/demo';
import { c, S, t } from '../src/theme';

export default function Notifications() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Notifications" />
      <ScrollView>
        {NOTIFICATIONS.map((n) => (
          <View key={n.id} style={s.row}>
            <View style={s.icon}><Ionicons name={n.icon as any} size={17} color={c.secondary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={[t.body, { fontWeight: '600' }]}>{n.title}</Text>
              <Text style={[t.small, { marginTop: 3 }]}>{n.body}</Text>
              <Text style={[t.tiny, { marginTop: 5 }]}>{n.when}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, paddingHorizontal: S.lg, paddingVertical: 14,
         borderBottomWidth: 0.5, borderBottomColor: c.border },
  icon: { width: 34, height: 34, borderRadius: 17, backgroundColor: c.header,
          alignItems: 'center', justifyContent: 'center' },
});
