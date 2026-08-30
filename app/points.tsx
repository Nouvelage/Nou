import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Head } from '../src/components/Head';
import { Empty } from '../src/components/ui';
import { c, S } from '../src/theme';

export default function Points() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <Head title="Points" />
      <ScrollView contentContainerStyle={{ padding: S.lg }}>
        <Empty icon="ribbon-outline" title="No points yet"
          note="Loyalty cards are not linked to customer accounts in Odoo yet, so this screen stays empty for now." />
      </ScrollView>
    </SafeAreaView>
  );
}
