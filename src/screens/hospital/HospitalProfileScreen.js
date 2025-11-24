import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { logout } from "../../redux/slice/authSlice";

export default function HospitalProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const { hospital, user } = useSelector((state) => state.auth);

 
  const name = hospital?.name || "Hospital";
  const address = hospital?.address || "Not provided";
  const contact = hospital?.contact || hospital?.phone || "Not available";
  const email = user?.email || "Not available";


  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };

  return (
    <ScreenWrapper scrollable={true}>
      <Text style={[styles.title, { color: colors.text }]}>
        Hospital Profile
      </Text>

      {/* Avatar with initials */}
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={[styles.avatarText, { color: colors.background }]}>
          {initials}
        </Text>
      </View>

      <Card style={{ paddingVertical: sizes.padding }}>
        <View style={styles.infoGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Name</Text>
          <Text style={[styles.value, { color: colors.text }]}>{name}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Address</Text>
          <Text style={[styles.value, { color: colors.text }]}>{address}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Contact</Text>
          <Text style={[styles.value, { color: colors.text }]}>{contact}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Email</Text>
          <Text style={[styles.value, { color: colors.text }]}>{email}</Text>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          style={{ marginTop: sizes.base, backgroundColor: colors.primary }}
        />
      </Card>
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
  infoGroup: {
    marginBottom: sizes.padding,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginBottom: 2,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.medium,
  },
});
