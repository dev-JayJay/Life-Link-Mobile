import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back 👋</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          Login to your LifeLink account
        </Text>

        <Input
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Login" onPress={() => navigation.navigate("UserTabs")} />

        <View style={styles.bottomText}>
          <Text style={{ color: colors.subText }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={[styles.link, { color: colors.primary }]}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.xlarge,
    fontFamily: fonts.bold,
    marginBottom: sizes.base,
  },
  subtitle: {
    fontSize: fontSizes.medium,
    marginBottom: sizes.padding,
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: sizes.margin,
  },
  link: {
    fontFamily: fonts.medium,
  },
});

export default LoginScreen;
