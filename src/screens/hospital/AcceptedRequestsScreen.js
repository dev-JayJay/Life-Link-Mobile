import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useTheme } from "../../constants/theme";
import { sizes } from "../../constants/sizes";
import { fonts, fontSizes } from "../../constants/fonts";

// Mock accepted requests
const acceptedRequests = [
  { id: "1", donor: "John Doe", bloodType: "A+", notes: "Available after 5 PM", eta: "5:30 PM" },
  { id: "2", donor: "Jane Smith", bloodType: "O-", notes: "Prefer morning", eta: "9:00 AM" },
];

export default function AcceptedRequestsScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: sizes.base }}>
      <Text style={[styles.donor, { color: colors.text }]}>{item.donor}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>Blood Type: {item.bloodType}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>Notes: {item.notes}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>ETA: {item.eta}</Text>

      <Button
        title="Mark as Completed"
        onPress={() => alert(`Request from ${item.donor} completed`)}
        style={{ marginTop: sizes.base }}
      />
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <Text style={[styles.title, { color: colors.text }]}>Accepted Requests</Text>
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
    textAlign: "center",
  },
  donor: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
  },
  detail: {
    fontSize: fontSizes.medium,
    marginTop: 2,
  },
});
