import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { c, S, t } from '../theme';

export function Head({ title, right }: { title: string; right?: React.ReactNode }) {
  const r = useRouter();
  return (
    <View style={s.h}>
      <Pressable onPress={() => r.back()} hitSlop={12}>
        <Ionicons name="chevron-back" size={22} color={c.primary} />
      </Pressable>
      <Text style={[t.h2, { flex: 1 }]} numberOfLines={1}>{title}</Text>
      {right}
    </View>
  );
}
const s = StyleSheet.create({
  h: { backgroundColor: c.header, padding: S.lg, flexDirection: 'row',
       alignItems: 'center', gap: S.md },
});
