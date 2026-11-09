import { Tabs } from 'expo-router/tabs';

import { colors } from '@/theme/tokens';
import { TabBar } from '@/ui/tab-bar';

/** Limang tab lang: Home, Book, Schedule, Club at Profile (Brand Guidelines p.75). */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.ivory } }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="book" />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen name="club" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
