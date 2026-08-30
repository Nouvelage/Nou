import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Btn } from '../src/components/ui';
import { useSession } from '../src/data/session';
import { c, R, S, t } from '../src/theme';

export default function EditProfile() {
  const { me } = useSession();
  const r = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Edit Profile" />
      <View style={{ padding: S.lg, flex: 1 }}>
        <View style={{ alignItems: 'center', marginBottom: S.xl }}>
          <View style={s.av}>
            <Ionicons name="person" size={30} color={c.secondary} />
            <View style={s.cam}><Ionicons name="camera" size={12} color={c.onPrimary} /></View>
          </View>
        </View>
        <TextInput style={s.in} defaultValue={me.name} placeholderTextColor={c.muted} />
        <TextInput style={s.in} defaultValue={me.phone} keyboardType="phone-pad" />
        <TextInput style={s.in} defaultValue={me.email} keyboardType="email-address"
          placeholder="Email" placeholderTextColor={c.muted} />
        <Text style={t.tiny}>
          Your email is saved to your clinic file so we can send you offers and updates.
        </Text>
        <View style={{ flex: 1 }} />
        <Btn label="Save" onPress={() => r.back()} />
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  av: { width: 88, height: 88, borderRadius: 44, backgroundColor: c.header,
        alignItems: 'center', justifyContent: 'center' },
  cam: { position: 'absolute', right: 0, bottom: 4, width: 26, height: 26, borderRadius: 13,
         backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' },
  in: { height: 50, borderRadius: R.md, borderWidth: 1, borderColor: c.borderStrong,
        paddingHorizontal: 16, marginBottom: S.md, fontSize: 15, color: c.primary },
});
