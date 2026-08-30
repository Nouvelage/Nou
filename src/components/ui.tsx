import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { c, R, card, t } from '../theme';

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[card, style]}>{children}</View>;
}

export function Btn({ label, onPress, variant = 'primary', disabled, style }: {
  label: string; onPress?: () => void;
  variant?: 'primary' | 'outline' | 'danger'; disabled?: boolean; style?: ViewStyle;
}) {
  const bg = variant === 'primary' ? c.primary : variant === 'danger' ? c.dangerBg : 'transparent';
  const fg = variant === 'primary' ? c.onPrimary : variant === 'danger' ? c.danger : c.primary;
  const bc = variant === 'danger' ? c.dangerBorder : c.primary;
  return (
    <Pressable onPress={onPress} disabled={disabled}
      style={({ pressed }) => [s.btn, { backgroundColor: bg, borderColor: bc,
        opacity: disabled ? 0.4 : pressed ? 0.85 : 1 }, style]}>
      <Text style={{ color: fg, fontSize: 15, fontWeight: '500' }}>{label}</Text>
    </Pressable>
  );
}

export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons key={n} size={size} color={c.star}
          name={value >= n ? 'star' : value >= n - 0.5 ? 'star-half' : 'star-outline'} />
      ))}
    </View>
  );
}

export function Chip({ label, icon }: { label: string; icon?: string }) {
  return (
    <View style={s.chip}>
      {icon ? <Ionicons name={icon as any} size={12} color={c.secondary} /> : null}
      <Text style={t.tiny}>{label}</Text>
    </View>
  );
}

export function Empty({ title, note, icon }: { title: string; note?: string; icon?: string }) {
  return (
    <View style={s.empty}>
      {icon ? <Ionicons name={icon as any} size={30} color={c.muted} /> : null}
      <Text style={[t.h3, { marginTop: 8 }]}>{title}</Text>
      {note ? <Text style={[t.small, { marginTop: 4, textAlign: 'center' }]}>{note}</Text> : null}
    </View>
  );
}

export function Bar({ value, max }: { value: number; max: number }) {
  const p = Math.max(0, Math.min(100, (value / max) * 100));
  return <View style={s.bar}><View style={[s.fill, { width: `${p}%` }]} /></View>;
}

export function Loading() {
  return <View style={s.empty}><ActivityIndicator color={c.secondary} /></View>;
}

const s = StyleSheet.create({
  btn: { height: 48, borderRadius: R.pill, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.header,
          borderRadius: R.pill, paddingHorizontal: 9, paddingVertical: 4 },
  empty: { paddingVertical: 48, alignItems: 'center' },
  bar: { height: 6, backgroundColor: c.header, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: c.secondary },
});
