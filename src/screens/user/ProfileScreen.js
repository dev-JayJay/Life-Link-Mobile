import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user: userData } = useSelector((state) => state.auth);

  const user = {
    name: userData?.fullName || "Danjuma Nathaniel",
    email: userData?.email || "nath@example.com",
    bloodType: userData?.bloodGroup || "-",
  };

  // Get initials
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <ScreenWrapper scrollable>
      <Text style={[styles.title, { color: colors.text }]}>My Profile</Text>

      {/* Avatar as initials */}
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={[styles.avatarText, { color: colors.background }]}>
          {initials}
        </Text>
      </View>

      {/* Profile Info */}
      <Card style={{ paddingVertical: sizes.padding }}>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.subText }]}>Name:</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user.name}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.subText }]}>Email:</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.subText }]}>
            Blood Type:
          </Text>
          <Text style={[styles.value, { color: colors.primary }]}>
            {user.bloodType}
          </Text>
        </View>
      </Card>

      {/* Logout */}
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logout());
          navigation.navigate("Login");
        }}
        style={{ marginTop: sizes.padding, backgroundColor: colors.primary }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: sizes.padding,
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: sizes.padding,
  },
  avatarText: {
    fontSize: fontSizes.large * 1.5,
    fontFamily: fonts.bold,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: sizes.base,
  },
  label: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.medium,
  },
  value: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.regular,
  },
});
