import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui';
import { useSession } from '../../src/data/session';
import { MY_PACKAGES } from '../../src/data/demo';
import { c, R, S, t } from '../../src/theme';

export default function Profile() {
  const { me, signOut } = useSession();
  const r = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <ScrollView>
        <View style={s.head}>
          <View style={s.avatar}><Ionicons name="person" size={28} color={c.secondary} /></View>
          <Text style={[t.h2, { marginTop: 8 }]}>{me.name}</Text>
          <Text style={[t.small, { marginTop: 3 }]}>{me.code} · {me.phone}</Text>
        </View>

        <View style={{ padding: S.lg }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[t.small, { flex: 1 }]}>Account balance</Text>
              <Text style={{ fontSize: 18, color: c.primary }}>
                {me.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {me.currency}
              </Text>
            </View>
          </Card>
          <Text style={[t.tiny, { marginTop: 4, marginBottom: S.lg }]}>Credit on your account</Text>

          <Pressable style={s.editBtn} onPress={() => r.push('/edit-profile')}>
            <Ionicons name="pencil-outline" size={16} color={c.primary} />
            <Text style={t.body}>Edit Profile</Text>
          </Pressable>

          <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>My Activity</Text>
          <Row icon="ribbon-outline" label="My Points" value="Not available yet" dim
            onPress={() => r.push('/points')} />
          <Row icon="cube-outline" label="My Packages" value={`${MY_PACKAGES.length} active`}
            onPress={() => r.push('/my-packages')} />

          <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>Preferences</Text>
          <Row icon="notifications-outline" label="Notifications" onPress={() => r.push('/notifications')} />
          <Row icon="location-outline" label="Location" onPress={() => r.push('/location')} />

          <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>Account</Text>
          <Row icon="lock-closed-outline" label="Change Password" onPress={() => r.push('/change-password')} />

          <Pressable style={s.logout} onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Stay', style: 'cancel' },
              { text: 'Logout', style: 'destructive',
                onPress: () => { signOut(); r.replace('/(auth)/login'); } }])}>
            <Ionicons name="log-out-outline" size={18} color={c.danger} />
            <Text style={{ color: c.danger, fontSize: 14 }}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ icon, label, value, onPress, dim }: {
  icon: string; label: string; value?: string; onPress?: () => void; dim?: boolean }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.row, pressed && { opacity: 0.7 }]}>
      <Ionicons name={icon as any} size={18} color={dim ? c.muted : c.secondary} />
      <Text style={[t.body, { flex: 1 }]}>{label}</Text>
      {value ? <Text style={[t.tiny, dim && { color: c.muted }]}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={15} color={c.muted} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  head: { backgroundColor: c.header, padding: S.lg, alignItems: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#D8C7B4',
            alignItems: 'center', justifyContent: 'center' },
  editBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
             backgroundColor: c.surface, borderWidth: 0.5, borderColor: c.border,
             borderRadius: R.md, padding: 13 },
  row: { backgroundColor: c.surface, borderWidth: 0.5, borderColor: c.border, borderRadius: R.md,
         padding: 13, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 11 },
  logout: { marginTop: S.md, backgroundColor: c.dangerBg, borderWidth: 0.5, borderColor: c.dangerBorder,
            borderRadius: R.md, padding: 13, flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center', gap: 8 },
});
