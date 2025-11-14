import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

export default function HospitalProfileScreen({ navigation }) {
  const { colors } = useTheme();

  // Mock state
  const [name, setName] = useState("City Hospital");
  const [address, setAddress] = useState("123 Main Street");
  const [contact, setContact] = useState("+234-9-461-4000");
  const [email, setEmail] = useState("hospital@example.com");

  // Get initials for avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSave = () => {
    alert("Profile updated!");
  };

  const handleLogout = () => {
    alert("Logged out!");
    navigation.navigate("Login");
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
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Contact</Text>
          <TextInput
            value={contact}
            onChangeText={setContact}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <Button
          title="Save Changes"
          onPress={handleSave}
          style={{ marginTop: sizes.padding }}
        />

        <Button
          title="Logout"
          onPress={handleLogout}
          style={{ marginTop: sizes.base, backgroundColor: colors.primary + "80" }}
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
  inputGroup: {
    marginBottom: sizes.base,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: sizes.radius,
    padding: sizes.base,
    fontFamily: fonts.regular,
  },
});
