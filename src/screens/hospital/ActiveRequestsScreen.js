import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

// MOCK DATA
const mockRequests = [
  {
    id: "1",
    bloodType: "O+",
    units: 2,
    urgency: "High",
    donorsMatched: 3,
  },
  {
    id: "2",
    bloodType: "A-",
    units: 1,
    urgency: "Normal",
    donorsMatched: 1,
  },
  {
    id: "3",
    bloodType: "B+",
    units: 4,
    urgency: "High",
    donorsMatched: 5,
  },
];

export default function ActiveRequestsScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <Card
      style={{
        borderLeftWidth: 5,
        borderLeftColor: item.urgency === "High" ? colors.primary : colors.secondary,
      }}
    >
      <Text style={[styles.requestText, { color: colors.text }]}>
        Blood Type: <Text style={{ fontWeight: "bold" }}>{item.bloodType}</Text>
      </Text>
      <Text style={[styles.requestText, { color: colors.text }]}>
        Units Needed: {item.units}
      </Text>
      <Text style={[styles.requestText, { color: colors.text }]}>
        Donors Matched: {item.donorsMatched}
      </Text>
      <Text style={[styles.requestText, { color: colors.text }]}>
        Urgency: {item.urgency}
      </Text>

      <Button
        title="Close Request"
        onPress={() => alert(`Request ${item.id} closed!`)}
        style={{ marginTop: sizes.base }}
      />
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>
          Active Blood Requests
        </Text>

        <FlatList
          data={mockRequests}
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
  requestText: {
    fontSize: fontSizes.medium,
    marginBottom: 2,
  },
});
