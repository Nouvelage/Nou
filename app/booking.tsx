import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Head } from '../src/components/Head';
import { Btn, Card, Stars } from '../src/components/ui';
import { BRANCHES, DOCTORS, TAKEN, TIMES } from '../src/data/demo';
import { c, R, S, t } from '../src/theme';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Booking() {
  const { service } = useLocalSearchParams<{ service?: string }>();
  const r = useRouter();
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(3);
  const [time, setTime] = useState<string | null>(null);
  const [doc, setDoc] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const branch = BRANCHES[0];
  const doctor = DOCTORS.find((d) => d.id === doc);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title={step === 2 ? 'Review Booking' : 'Book an appointment'} />

      <View style={s.branch}>
        <Ionicons name="location-outline" size={15} color={c.secondary} />
        <Text style={[t.small, { flex: 1 }]}>{branch.name} branch</Text>
        <Pressable style={s.change}><Text style={t.tiny}>Change</Text></Pressable>
      </View>

      <View style={s.steps}>
        {['Date & Time', 'Doctor', 'Review'].map((l, i) => (
          <View key={l} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[t.small, i === step && { color: c.primary, fontWeight: '600' }]}>{l}</Text>
            <View style={[s.line, i <= step && { backgroundColor: c.primary }]} />
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {step === 0 ? (
          <>
            <Text style={[t.h3, { marginBottom: 10 }]}>September 2026</Text>
            <View style={s.cal}>
              {DAYS.map((d) => <Text key={d} style={[t.tiny, s.cell]}>{d}</Text>)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => {
                const off = n % 7 === 5;
                return (
                  <Pressable key={n} disabled={off} onPress={() => setDay(n)}
                    style={[s.cell, s.dayCell, day === n && s.daySel]}>
                    <Text style={[t.small, off && { color: c.borderStrong },
                      day === n && { color: c.onPrimary }]}>{n}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={[t.h3, { marginTop: S.lg, marginBottom: 10 }]}>Select time</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {TIMES.map((x) => {
                const off = TAKEN.includes(x);
                return (
                  <Pressable key={x} disabled={off} onPress={() => setTime(x)}
                    style={[s.time, time === x && { backgroundColor: c.primary, borderColor: c.primary },
                      off && { opacity: 0.35 }]}>
                    <Text style={[t.small, time === x && { color: c.onPrimary }]}>{x}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : step === 1 ? (
          <>
            <Text style={[t.small, { marginBottom: 10 }]}>{DOCTORS.length} doctors available</Text>
            {DOCTORS.map((d) => (
              <Pressable key={d.id} onPress={() => setDoc(d.id)}
                style={[s.doc, doc === d.id && { borderColor: c.primary, borderWidth: 1.2 }]}>
                <View style={s.av}><Ionicons name="person" size={18} color={c.secondary} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={t.body}>{d.name}</Text>
                  <Text style={t.tiny}>{d.specialty}</Text>
                </View>
                <Text style={t.small}>{d.rating}</Text>
                <Ionicons name="star" size={13} color={c.star} />
              </Pressable>
            ))}
          </>
        ) : (
          <>
            <Card style={{ marginBottom: S.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={s.av}><Ionicons name="person" size={18} color={c.secondary} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={t.body}>{doctor?.name ?? 'Any available doctor'}</Text>
                  <Text style={t.tiny}>{doctor?.specialty ?? ''}</Text>
                </View>
              </View>
            </Card>
            <Card>
              <Text style={[t.h3, { marginBottom: 6 }]}>Date &amp; Time</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="time-outline" size={15} color={c.secondary} />
                <Text style={[t.small, { flex: 1 }]}>{day} Sep 2026, {time ?? '16:00'}</Text>
                <Ionicons name="pencil-outline" size={15} color={c.secondary} />
              </View>
              {service ? (
                <Text style={[t.small, { marginTop: 10 }]}>Service: {service}</Text>
              ) : null}
            </Card>
          </>
        )}
      </ScrollView>

      <View style={{ padding: S.lg, paddingTop: 0 }}>
        <Btn label={step === 2 ? 'Confirm' : 'Continue'}
          disabled={step === 0 && !time}
          onPress={() => (step === 2 ? setDone(true) : setStep(step + 1))} />
      </View>

      <Modal transparent visible={done} animationType="fade">
        <View style={s.backdrop}>
          <View style={s.sheet}>
            <Ionicons name="checkmark-circle-outline" size={48} color={c.primary} />
            <Text style={[t.h2, { marginTop: 10, textAlign: 'center' }]}>
              Your appointment is confirmed
            </Text>
            <Text style={[t.small, { marginTop: 4 }]}>We're looking forward to seeing you.</Text>
            <Btn label="Go to home" style={{ alignSelf: 'stretch', marginTop: S.lg }}
              onPress={() => { setDone(false); r.replace('/(tabs)'); }} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  branch: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: S.lg,
            paddingVertical: 10, backgroundColor: c.header },
  change: { borderWidth: 0.8, borderColor: c.borderStrong, borderRadius: R.pill,
            paddingHorizontal: 12, paddingVertical: 4 },
  steps: { flexDirection: 'row', paddingHorizontal: S.lg, paddingTop: S.md },
  line: { height: 2, width: '70%', backgroundColor: c.border, marginTop: 6, borderRadius: 2 },
  cal: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, textAlign: 'center', paddingVertical: 6 },
  dayCell: { alignItems: 'center', justifyContent: 'center', height: 38 },
  daySel: { backgroundColor: c.primary, borderRadius: 19 },
  time: { borderWidth: 1, borderColor: c.borderStrong, borderRadius: R.pill,
          paddingHorizontal: 16, paddingVertical: 8 },
  doc: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: c.surface,
         borderWidth: 0.5, borderColor: c.border, borderRadius: R.lg, padding: 12, marginBottom: 8 },
  av: { width: 38, height: 38, borderRadius: 19, backgroundColor: c.header,
        alignItems: 'center', justifyContent: 'center' },
  backdrop: { flex: 1, backgroundColor: 'rgba(62,46,32,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: c.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22,
           padding: S.xl, alignItems: 'center' },
});
