import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Btn, Chip } from '../src/components/ui';
import { OFFERS } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

export default function Package() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const r = useRouter();
  const p = OFFERS.find((x) => String(x.id) === id) ?? OFFERS[0];
  const [pay, setPay] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title={pay ? 'Buy Package' : p.name} />
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {!pay ? (
          <>
            <View style={s.hero}><Ionicons name="flash" size={40} color={c.secondary} /></View>
            <Text style={[t.small, { marginTop: S.lg, lineHeight: 20 }]}>
              Achieve smooth, hair-free skin with our full body laser sessions for long-lasting results.
            </Text>
            <Text style={[t.h3, { marginTop: S.lg, marginBottom: 8 }]}>What's Included</Text>
            <View style={{ gap: 8, alignItems: 'flex-start' }}>
              {p.includes.map((x) => <Chip key={x} icon="checkmark-circle-outline" label={x} />)}
            </View>
            <Btn label={`Buy Package ${p.price.toLocaleString()} EGP`} style={{ marginTop: S.xl }}
              onPress={() => setPay(true)} />
          </>
        ) : (
          <>
            <Text style={[t.h3, { marginBottom: S.md }]}>Pay with credit card</Text>
            <TextInput style={s.in} placeholder="Card number" placeholderTextColor={c.muted}
              keyboardType="number-pad" />
            <View style={{ flexDirection: 'row', gap: S.md }}>
              <TextInput style={[s.in, { flex: 1 }]} placeholder="Date" placeholderTextColor={c.muted} />
              <TextInput style={[s.in, { flex: 1 }]} placeholder="CVV" placeholderTextColor={c.muted}
                keyboardType="number-pad" secureTextEntry />
            </View>
            <Text style={[t.tiny, { marginTop: S.md }]}>
              Demo only — no payment gateway is connected yet.
            </Text>
            <Btn label="Confirm &amp; Pay" style={{ marginTop: S.xl }} onPress={() => setDone(true)} />
          </>
        )}
      </ScrollView>

      <Modal transparent visible={done} animationType="fade">
        <View style={s.backdrop}>
          <View style={s.sheet}>
            <Ionicons name="checkmark-circle-outline" size={48} color={c.primary} />
            <Text style={[t.h2, { marginTop: 10 }]}>Payment Successful</Text>
            <Text style={[t.small, { marginTop: 4, textAlign: 'center' }]}>
              Your package has been added to your account.
            </Text>
            <Btn label="Go to home" style={{ alignSelf: 'stretch', marginTop: S.lg }}
              onPress={() => { setDone(false); r.replace('/(tabs)'); }} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  hero: { height: 170, borderRadius: R.lg, backgroundColor: c.header,
          alignItems: 'center', justifyContent: 'center' },
  in: { height: 50, borderRadius: R.md, borderWidth: 1, borderColor: c.borderStrong,
        paddingHorizontal: 16, marginBottom: S.md, fontSize: 15, color: c.primary },
  backdrop: { flex: 1, backgroundColor: 'rgba(62,46,32,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: c.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22,
           padding: S.xl, alignItems: 'center' },
});
