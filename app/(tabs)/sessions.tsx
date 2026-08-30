import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bar, Btn, Card, Empty } from '../../src/components/ui';
import { SESSIONS } from '../../src/data/demo';
import { c, R, S, t } from '../../src/theme';

export default function Sessions() {
  const [tab, setTab] = useState<'upcoming' | 'last'>('upcoming');
  const list = SESSIONS.filter((x) =>
    tab === 'upcoming' ? x.state === 'upcoming' : x.state !== 'upcoming');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <View style={s.head}>
        <Text style={t.h2}>Sessions</Text>
        <Text style={[t.small, { marginTop: 4 }]}>View your upcoming and past sessions.</Text>
      </View>

      <View style={s.seg}>
        {(['upcoming', 'last'] as const).map((k) => (
          <Pressable key={k} onPress={() => setTab(k)} style={[s.segBtn, tab === k && s.on]}>
            <Text style={[t.small, tab === k && { color: c.onPrimary }]}>
              {k === 'upcoming' ? 'Upcoming' : 'Last'}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: S.lg, paddingTop: 0 }}>
        {list.length === 0 ? <Empty title="Nothing here yet" /> : list.map((x) => (
          <Card key={x.id} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={s.pill}><Text style={t.tiny}>{x.date}</Text></View>
              <Text style={[t.small, { marginLeft: 10 }]}>{x.time}</Text>
              <View style={{ flex: 1 }} />
              {x.state === 'cancelled' ? <Badge label="Canceled" tone="danger" />
                : x.state === 'completed' ? <Badge label="Completed" tone="ok" />
                : <Badge label="Tomorrow" tone="primary" />}
            </View>

            <Text style={[t.body, { marginTop: 10, fontSize: 15 }]}>{x.service}</Text>
            {x.progress ? (
              <Text style={[t.tiny, { marginTop: 2 }]}>
                Session {x.progress.done} of {x.progress.total}
              </Text>
            ) : null}
            <Text style={[t.small, { marginTop: 6 }]}>{x.doctor} · {x.branch}</Text>

            {x.progress ? (
              <View style={{ marginTop: 10 }}>
                <Bar value={x.progress.done} max={x.progress.total} />
              </View>
            ) : null}

            {x.remaining > 0 ? (
              <Text style={[t.tiny, { marginTop: 8, color: c.danger }]}>
                {x.remaining.toLocaleString()} EGP due
              </Text>
            ) : null}

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              {x.state === 'upcoming' ? (
                <>
                  <Btn label="Reschedule" variant="outline" style={{ flex: 1 }} />
                  <Btn label="Cancel" variant="danger" style={{ flex: 1 }}
                    onPress={() => Alert.alert('Cancel appointment', `Cancel ${x.ref}?`, [
                      { text: 'Keep it', style: 'cancel' },
                      { text: 'Cancel it', style: 'destructive' }])} />
                </>
              ) : <Btn label="Rebook" variant="outline" style={{ flex: 1 }} />}
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Badge({ label, tone }: { label: string; tone: 'primary' | 'ok' | 'danger' }) {
  const bg = tone === 'primary' ? c.primary : tone === 'ok' ? c.okBg : c.dangerBg;
  const fg = tone === 'primary' ? c.onPrimary : tone === 'ok' ? c.ok : c.danger;
  return (
    <View style={{ backgroundColor: bg, borderRadius: R.pill, paddingHorizontal: 12, paddingVertical: 5 }}>
      <Text style={{ color: fg, fontSize: 11 }}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  head: { backgroundColor: c.header, padding: S.lg },
  seg: { flexDirection: 'row', margin: S.lg, backgroundColor: c.header, borderRadius: R.pill },
  segBtn: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: R.pill },
  on: { backgroundColor: c.primary },
  pill: { backgroundColor: c.header, borderRadius: R.pill, paddingHorizontal: 10, paddingVertical: 4 },
});
