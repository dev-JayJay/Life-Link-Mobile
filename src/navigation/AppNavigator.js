import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import UserTabs from "./UserTabs";
import HospitalTabNavigator from "./HospitalTabNavigator";
import CreateRequestScreen from "../screens/hospital/CreateRequestScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserTabs" component={UserTabs} />
        <Stack.Screen
          name="CreateRequest"
          component={CreateRequestScreen}
          options={{ title: "Create Blood Request" }}
        />

        <Stack.Screen
          name="HospitalHome"
          component={HospitalTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
