import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Btn } from '../../src/components/ui';
import { useSession } from '../../src/data/session';
import { c, R, S, t } from '../../src/theme';

export default function Register() {
  const { signIn } = useSession();
  const r = useRouter();
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [done, setDone] = useState(false);

  return (
    <SafeAreaView style={s.wrap}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={s.head}>
          <Text style={s.logo}>g</Text>
          <Text style={[t.h1, { textAlign: 'center' }]}>
            {step === 'form' ? 'Create Your Account' : 'Verify Your Number'}
          </Text>
          <Text style={[t.small, { textAlign: 'center', marginTop: 6 }]}>
            {step === 'form' ? 'Enter your phone number to get started'
              : `Enter the 6-digit code sent to ${phone || '**********'}`}
          </Text>
        </View>

        {step === 'form' ? (
          <>
            <TextInput style={s.in} placeholder="Phone number" placeholderTextColor={c.muted}
              keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
            <TextInput style={s.in} placeholder="Create password" placeholderTextColor={c.muted} secureTextEntry />
            <TextInput style={s.in} placeholder="Confirm password" placeholderTextColor={c.muted} secureTextEntry />
          </>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <View key={n} style={[s.cell, otp.length === n && { borderColor: c.primary, borderWidth: 1.5 }]}>
                <Text style={{ fontSize: 20, color: c.primary }}>{otp[n] ?? ''}</Text>
              </View>
            ))}
            <TextInput style={s.hidden} keyboardType="number-pad" maxLength={6}
              value={otp} onChangeText={setOtp} autoFocus />
          </View>
        )}

        <View style={{ flex: 1 }} />
        <Btn label={step === 'form' ? 'Send OTP' : 'Verify'}
          onPress={() => (step === 'form' ? setStep('otp') : setDone(true))} />
        <Pressable style={{ alignItems: 'center', paddingVertical: S.lg }}
          onPress={() => (step === 'otp' ? setStep('form') : r.push('/(auth)/login'))}>
          <Text style={t.small}>
            {step === 'otp' ? "Didn't receive the code? "
              : 'Already have an account? '}
            <Text style={{ color: c.primary, fontWeight: '600' }}>
              {step === 'otp' ? 'Resend Code' : 'Log in'}
            </Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>

      <Modal transparent visible={done} animationType="fade">
        <View style={s.backdrop}>
          <View style={s.sheet}>
            <Ionicons name="happy-outline" size={40} color={c.primary} />
            <Text style={[t.h2, { marginTop: 10 }]}>You're All Set</Text>
            <Text style={[t.small, { marginTop: 4, textAlign: 'center' }]}>
              Your account has been successfully created
            </Text>
            <Btn label="Get Started" style={{ alignSelf: 'stretch', marginTop: S.lg }}
              onPress={() => { setDone(false); signIn(); r.replace('/(tabs)'); }} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: c.bg, padding: S.xl },
  head: { paddingVertical: 34, alignItems: 'center' },
  logo: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 46, color: '#A9836B', marginBottom: 10 },
  in: { height: 52, borderRadius: R.pill, borderWidth: 1, borderColor: c.borderStrong,
        paddingHorizontal: 20, marginBottom: S.md, fontSize: 15, color: c.primary },
  cell: { width: 44, height: 52, borderRadius: R.md, borderWidth: 1, borderColor: c.borderStrong,
          alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface },
  hidden: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  backdrop: { flex: 1, backgroundColor: 'rgba(62,46,32,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: c.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22,
           padding: S.xl, alignItems: 'center' },
});
