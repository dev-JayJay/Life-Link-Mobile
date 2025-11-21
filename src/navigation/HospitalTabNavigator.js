import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HospitalDashboard from "../screens/hospital/HospitalDashboard";
import HospitalProfileScreen from "../screens/hospital/HospitalProfileScreen";
import IncomingRequestsScreen from "../screens/hospital/IncomingRequestsScreen"; // new
import AcceptedRequestsScreen from "../screens/hospital/AcceptedRequestsScreen"; // new
import { useTheme } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HospitalNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarStyle: { backgroundColor: colors.card },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HospitalDashboard}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Incoming Requests"
        component={IncomingRequestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Accepted Requests"
        component={AcceptedRequestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-done-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HospitalProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
