import React, { useState, useEffect } from "react";
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
import { useRegisterUserMutation } from "../../api/authApi";
import Toast from "react-native-toast-message";

import * as Location from "expo-location";

const SignupScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");

  const [locationCoords, setLocationCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocationCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (err) {
        console.log("Error getting location:", err);
      }
    })();
  }, []);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async () => {
    if (
      role === "user" &&
      (!name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !phone.trim() ||
        !bloodType.trim())
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill all required fields",
      });
      return;
    }

    if (
      role === "hospital" &&
      (!name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !phone.trim() ||
        !location.trim())
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill all required fields",
      });
      return;
    }

    const payload =
      role === "user"
        ? {
            name,
            email,
            phone,
            password,
            bloodType,
            role: "user",
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
          }
        : {
            name,
            email,
            phone,
            password,
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
            role: "hospital",
          };

    try {
      const res = await registerUser(payload).unwrap();
      Toast.show({
        type: "success",
        text1: "Registration Successful",
      });

      if (role === "hospital") {
        navigation.navigate("HospitalHome");
      } else {
        navigation.navigate("UserTabs");
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          Create Account 🩸
        </Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          Join LifeLink and save lives
        </Text>

        {/* Role Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor: role === "user" ? colors.primary : colors.card,
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
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
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
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
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
        <Button
          title={isLoading ? "Signing Up..." : "Sign Up"}
          onPress={handleRegister}
          disabled={
            locationCoords.latitude === 0 && locationCoords.longitude === 0
          }
        />

        {/* Bottom Link */}
        <View style={styles.bottomText}>
          <Text style={{ color: colors.subText }}>
            Already have an account?
          </Text>
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
