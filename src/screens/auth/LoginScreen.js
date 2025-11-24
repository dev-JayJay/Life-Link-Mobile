import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { useLoginUserMutation } from "../../api/authApi";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slice/authSlice";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Email and password are required",
      });
      return;
    }

    try {
      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials(res));

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back!`,
      });

      // Role-based navigation
      if (res.user.role === "HOSPITAL") {
        navigation.navigate("HospitalHome");
      } else {
        navigation.navigate("UserTabs");
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome Back 👋
        </Text>
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

        <Button
          title={isLoading ? "Logging in..." : "Login"}
          onPress={handleLogin}
        />

        <View style={styles.bottomText}>
          <Text style={{ color: colors.subText }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={[styles.link, { color: colors.primary }]}>
              {" "}
              Sign Up
            </Text>
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
