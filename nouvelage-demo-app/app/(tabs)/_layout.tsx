import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { c } from '../../src/theme';

export default function L() {
  const icon = (n: string) => ({ color, size }: any) => <Ionicons name={n as any} size={size} color={color} />;
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: c.primary, tabBarInactiveTintColor: c.muted,
      tabBarStyle: { backgroundColor: c.header, borderTopColor: c.borderStrong,
                     borderTopWidth: 0.5, height: 62, paddingBottom: 8, paddingTop: 6 },
      tabBarLabelStyle: { fontSize: 11 },
    }}>
      <Tabs.Screen name="index"    options={{ title: 'Home',     tabBarIcon: icon('home-outline') }} />
      <Tabs.Screen name="services" options={{ title: 'Services', tabBarIcon: icon('grid-outline') }} />
      <Tabs.Screen name="sessions" options={{ title: 'Sessions', tabBarIcon: icon('calendar-outline') }} />
      <Tabs.Screen name="profile"  options={{ title: 'Profile',  tabBarIcon: icon('person-outline') }} />
    </Tabs>
  );
}
