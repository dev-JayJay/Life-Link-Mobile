import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { sizes } from "../../constants/sizes";
import { fonts, fontSizes } from "../../constants/fonts";

// Mock data
const mockRequests = [
  { id: "1", donor: "John Doe", bloodType: "A+", notes: "Available after 5 PM" },
  { id: "2", donor: "Jane Smith", bloodType: "O-", notes: "Prefer morning" },
];

export default function IncomingRequestsScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: sizes.base }}>
      <Text style={[styles.donor, { color: colors.text }]}>{item.donor}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>Blood Type: {item.bloodType}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>Notes: {item.notes}</Text>
      <View style={{ flexDirection: "row", marginTop: sizes.base }}>
        <Button title="Accept" onPress={() => alert("Accepted")} style={{ flex: 1, marginRight: sizes.base/2 }} />
        <Button title="Reject" onPress={() => alert("Rejected")} style={{ flex: 1, marginLeft: sizes.base/2, backgroundColor: colors.secondary }} />
      </View>
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <Text style={[styles.title, { color: colors.text }]}>Incoming Requests</Text>
      <FlatList
        data={mockRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSizes.large, fontFamily: fonts.bold, marginBottom: sizes.padding, textAlign: "center" },
  donor: { fontSize: fontSizes.medium, fontFamily: fonts.bold },
  detail: { fontSize: fontSizes.medium, marginTop: 2 },
});
