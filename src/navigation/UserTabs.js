import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import DashboardScreen from "../screens/user/DashboardScreen";
import MyRequestsScreen from "../screens/user/MyRequestsScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import NewDonationRequestScreen from "../screens/user/NewDonationRequestScreen";
import { useTheme } from "../constants/theme";

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
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
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="My Requests"
        component={MyRequestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
        }}
      />
        <Tab.Screen
          name="Donate Blood"
          component={NewDonationRequestScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="water-outline" color={color} size={size} />,
          }}
        />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
