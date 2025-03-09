import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, Clock, User, Car, Printer as Steering, DollarSign } from 'lucide-react-native';
import { useUser } from '../../context/UserContext';

export default function TabLayout() {
  const { userType } = useUser();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      {userType === 'driver' ? (
        // Driver Tabs
        <>
          <Tabs.Screen
            name="driver-home"
            options={{
              title: 'Available Rides',
              tabBarIcon: ({ size, color }) => <Car size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="driver-earnings"
            options={{
              title: 'Earnings',
              tabBarIcon: ({ size, color }) => <DollarSign size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="driver-history"
            options={{
              title: 'History',
              tabBarIcon: ({ size, color }) => <Clock size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="driver-shift"
            options={{
              title: 'Shift',
              tabBarIcon: ({ size, color }) => <Steering size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
            }}
          />
        </>
      ) : (
        // Rider Tabs
        <>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="bids"
            options={{
              title: 'My Bids',
              tabBarIcon: ({ size, color }) => <Car size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: 'History',
              tabBarIcon: ({ size, color }) => <Clock size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
            }}
          />
        </>
      )}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});