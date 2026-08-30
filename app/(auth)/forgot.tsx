import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Btn } from '../../src/components/ui';
import { c, R, S, t } from '../../src/theme';

export default function Forgot() {
  const r = useRouter();
  return (
    <SafeAreaView style={s.wrap}>
      <Pressable onPress={() => r.back()} hitSlop={12} style={{ paddingVertical: 8 }}>
        <Ionicons name="chevron-back" size={22} color={c.primary} />
      </Pressable>
      <View style={{ paddingVertical: 40, alignItems: 'center' }}>
        <Text style={s.logo}>g</Text>
        <Text style={[t.h1, { textAlign: 'center' }]}>Forget Password</Text>
        <Text style={[t.small, { textAlign: 'center', marginTop: 6 }]}>
          Enter your phone number to reset password
        </Text>
      </View>
      <TextInput style={s.in} placeholder="Phone number" placeholderTextColor={c.muted} keyboardType="phone-pad" />
      <View style={{ flex: 1 }} />
      <Btn label="Continue" onPress={() => r.back()} />
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: c.bg, padding: S.xl },
  logo: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 46, color: '#A9836B', marginBottom: 10 },
  in: { height: 52, borderRadius: R.pill, borderWidth: 1, borderColor: c.borderStrong,
        paddingHorizontal: 20, fontSize: 15, color: c.primary },
});
