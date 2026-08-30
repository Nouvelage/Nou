import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Btn } from '../../src/components/ui';
import { useSession } from '../../src/data/session';
import { c, R, S, t } from '../../src/theme';

export default function Login() {
  const { signIn } = useSession();
  const r = useRouter();
  const [phone, setPhone] = useState('');
  const [pw, setPw] = useState('');

  return (
    <SafeAreaView style={s.wrap}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={s.head}>
          <Text style={s.logo}>g</Text>
          <Text style={[t.h1, { textAlign: 'center' }]}>Welcome Back</Text>
          <Text style={[t.small, { textAlign: 'center', marginTop: 6 }]}>
            Enter your phone number to continue
          </Text>
        </View>

        <TextInput style={s.in} placeholder="Phone number" placeholderTextColor={c.muted}
          keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <TextInput style={s.in} placeholder="Password" placeholderTextColor={c.muted}
          secureTextEntry value={pw} onChangeText={setPw} />
        <Link href="/(auth)/forgot" asChild>
          <Pressable><Text style={[t.small, { marginTop: 2 }]}>Forget Password?</Text></Pressable>
        </Link>

        <Text style={[t.tiny, { marginTop: S.lg }]}>Or continue with</Text>
        <View style={{ flexDirection: 'row', gap: S.md, marginTop: S.sm }}>
          <Pressable style={s.social} onPress={() => { signIn(); r.replace('/(tabs)'); }}>
            <Ionicons name="logo-google" size={18} color={c.primary} />
            <Text style={t.body}>Google</Text>
          </Pressable>
          <Pressable style={s.social} onPress={() => { signIn(); r.replace('/(tabs)'); }}>
            <Ionicons name="logo-apple" size={18} color={c.primary} />
            <Text style={t.body}>Apple</Text>
          </Pressable>
        </View>

        <View style={{ flex: 1 }} />
        <Btn label="Log In" onPress={() => { signIn(); r.replace('/(tabs)'); }} />
        <Link href="/(auth)/register" asChild>
          <Pressable style={{ alignItems: 'center', paddingVertical: S.lg }}>
            <Text style={t.small}>
              Don't have an account? <Text style={{ color: c.primary, fontWeight: '600' }}>Create one</Text>
            </Text>
          </Pressable>
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: c.bg, padding: S.xl },
  head: { paddingVertical: 40, alignItems: 'center' },
  logo: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 46, color: '#A9836B', marginBottom: 10 },
  in: { height: 52, borderRadius: R.pill, borderWidth: 1, borderColor: c.borderStrong,
        paddingHorizontal: 20, marginBottom: S.md, fontSize: 15, color: c.primary },
  social: { flex: 1, height: 46, borderRadius: R.pill, borderWidth: 1, borderColor: c.borderStrong,
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
});
