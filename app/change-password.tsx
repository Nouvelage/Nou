import { View, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Head } from '../src/components/Head';
import { Btn } from '../src/components/ui';
import { c, R, S } from '../src/theme';

export default function ChangePassword() {
  const r = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Change Password" />
      <View style={{ padding: S.lg, flex: 1 }}>
        <TextInput style={s.in} placeholder="Current Password" placeholderTextColor={c.muted} secureTextEntry />
        <TextInput style={s.in} placeholder="New Password" placeholderTextColor={c.muted} secureTextEntry />
        <TextInput style={s.in} placeholder="Confirm new Password" placeholderTextColor={c.muted} secureTextEntry />
        <View style={{ flex: 1 }} />
        <Btn label="Save" onPress={() => r.back()} />
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  in: { height: 50, borderRadius: R.md, borderWidth: 1, borderColor: c.borderStrong,
        paddingHorizontal: 16, marginBottom: S.md, fontSize: 15, color: c.primary },
});
