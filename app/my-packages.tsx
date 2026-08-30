import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Head } from '../src/components/Head';
import { Bar, Card, Empty } from '../src/components/ui';
import { MY_PACKAGES } from '../src/data/demo';
import { c, S, t } from '../src/theme';

export default function MyPackages() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="My Packages" />
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        {MY_PACKAGES.length === 0 ? <Empty title="No packages yet" /> : (
          <>
            <Text style={[t.small, { marginBottom: 10 }]}>You are subscribed in</Text>
            {MY_PACKAGES.map((p) => (
              <Card key={p.id} style={{ marginBottom: S.md }}>
                <Text style={[t.body, { fontSize: 15 }]}>{p.name}</Text>
                <Text style={[t.small, { marginTop: 4 }]}>
                  Purchased {p.purchased} · Expires {p.expires}
                </Text>
                <View style={{ marginTop: 12 }}>
                  <Bar value={p.pulsesLeft} max={p.pulsesTotal} />
                </View>
                <Text style={[t.small, { marginTop: 7 }]}>
                  {p.pulsesLeft.toLocaleString()} of {p.pulsesTotal.toLocaleString()} pulses left
                </Text>
                <Text style={[t.tiny, { marginTop: 6 }]}>
                  Paid {p.paid.toLocaleString()} EGP in full
                </Text>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
