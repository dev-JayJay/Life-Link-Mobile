import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
}
