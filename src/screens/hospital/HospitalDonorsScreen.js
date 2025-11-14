import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

// MOCK DONORS DATA
const mockDonors = [
  { id: "1", name: "John Doe", bloodType: "O+", distance: "2.4 km", contact: "123-456-7890" },
  { id: "2", name: "Jane Smith", bloodType: "A-", distance: "5.1 km", contact: "987-654-3210" },
  { id: "3", name: "Mike Johnson", bloodType: "B+", distance: "1.2 km", contact: "555-555-5555" },
];

export default function HospitalDonorsScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <Card>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Distance: {item.distance}
      </Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Contact: {item.contact}
      </Text>
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>
          Matched Donors
        </Text>

        <FlatList
          data={mockDonors}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: sizes.padding,
  },
  name: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
    marginBottom: 2,
  },
  detail: {
    fontSize: fontSizes.medium,
    marginBottom: 2,
  },
});

