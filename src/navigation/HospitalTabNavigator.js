import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HospitalDashboard from "../screens/hospital/HospitalDashboard";
import ActiveRequestsScreen from "../screens/hospital/ActiveRequestsScreen";
import HospitalDonorsScreen from "../screens/hospital/HospitalDonorsScreen";
import HospitalProfileScreen from "../screens/hospital/HospitalProfileScreen";

import { useTheme } from "../constants/theme";

const Tab = createBottomTabNavigator();

export default function HospitalTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarStyle: { backgroundColor: colors.card, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") iconName = "home-outline";
          else if (route.name === "Requests") iconName = "list-outline";
          else if (route.name === "Donors") iconName = "people-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={HospitalDashboard} />
      <Tab.Screen name="Requests" component={ActiveRequestsScreen} />
      <Tab.Screen name="Donors" component={HospitalDonorsScreen} />
      <Tab.Screen name="Profile" component={HospitalProfileScreen} />
    </Tab.Navigator>
  );
}
