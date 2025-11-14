import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

export default function HospitalDashboard({ navigation }) {
  const { colors } = useTheme();

  // Mock hospital data
  const hospital = {
    name: "City General Hospital",
    address: "123 Main Street",
    contact: "123-456-7890",
  };

  return (
    <ScreenWrapper scrollable={false}>
      {/* Hospital Info Card */}
      <Card style={{ marginBottom: 20 }}>
        <Text style={[styles.hospitalName, { color: colors.text }]}>
          {hospital.name}
        </Text>
        <Text style={[styles.hospitalDetail, { color: colors.subText }]}>
          Address: {hospital.address}
        </Text>
        <Text style={[styles.hospitalDetail, { color: colors.subText }]}>
          Contact: {hospital.contact}
        </Text>
      </Card>

      {/* Dashboard Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        Quick Actions
      </Text>

      {/* Action Cards */}
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateRequest")}
      >
        <Card
          title="Create Blood Request"
          subtitle="Send a new request to available donors"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Requests")}
      >
        <Card
          title="View Active Requests"
          subtitle="Monitor pending and ongoing requests"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Donors")}
      >
        <Card
          title="View Donors"
          subtitle="See matched or available donors"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
      >
        <Card
          title="Hospital Profile"
          subtitle="Manage your hospital information"
        />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  hospitalName: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  hospitalDetail: {
    fontSize: fontSizes.medium,
    marginBottom: 2,
  },
  title: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: sizes.padding,
  },
});
