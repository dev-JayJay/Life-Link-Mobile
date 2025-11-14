import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

// Mock accepted requests
const acceptedRequests = [
  { id: "1", hospital: "City General Hospital", bloodType: "O+", status: "Pending" },
  { id: "2", hospital: "HopeCare Clinic", bloodType: "B+", status: "Completed" },
];

export default function MyRequestsScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <Card>
      <Text style={[styles.hospital, { color: colors.text }]}>{item.hospital}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Status: {item.status}
      </Text>
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <Text style={[styles.title, { color: colors.text }]}>My Accepted Requests</Text>
      <FlatList
        data={acceptedRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: sizes.padding,
  },
  hospital: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  detail: {
    fontSize: fontSizes.medium,
    marginBottom: 2,
  },
});
