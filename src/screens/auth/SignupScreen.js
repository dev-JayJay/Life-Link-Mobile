import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

const SignupScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>Create Account 🩸</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          Join LifeLink and save lives
        </Text>

        {/* Role Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor:
                  role === "user" ? colors.primary : colors.card,
              },
            ]}
            onPress={() => setRole("user")}
          >
            <Text
              style={[
                styles.toggleText,
                {
                  color: role === "user" ? colors.background : colors.text,
                },
              ]}
            >
              Donor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor:
                  role === "hospital" ? colors.primary : colors.card,
              },
            ]}
            onPress={() => setRole("hospital")}
          >
            <Text
              style={[
                styles.toggleText,
                {
                  color: role === "hospital" ? colors.background : colors.text,
                },
              ]}
            >
              Hospital
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Form Fields */}
        {role === "user" ? (
          <>
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
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
            <Input
              placeholder="Blood Type (e.g. O+, A-)"
              value={bloodType}
              onChangeText={setBloodType}
            />
          </>
        ) : (
          <>
            <Input
              placeholder="Hospital Name"
              value={hospitalName}
              onChangeText={setHospitalName}
            />
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
            <Input
              placeholder="Hospital Location"
              value={location}
              onChangeText={setLocation}
            />
          </>
        )}

        {/* Submit */}
        <Button title="Sign Up" onPress={() => navigation.navigate("HospitalHome")} />

        {/* Bottom Link */}
        <View style={styles.bottomText}>
          <Text style={{ color: colors.subText }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.link, { color: colors.primary }]}> Login</Text>
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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: sizes.padding,
    borderRadius: sizes.radius,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: sizes.radius,
    marginHorizontal: 4,
  },
  toggleText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
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

export default SignupScreen;
