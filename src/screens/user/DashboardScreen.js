import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import Card from "../../components/Card";
import Button from "../../components/Button";

// Mock data
const mockRequests = [
  { id: "1", hospital: "City General Hospital", bloodType: "O+", distance: "2.4 km", urgency: "High" },
  { id: "2", hospital: "St. Mary’s Medical Center", bloodType: "A-", distance: "5.8 km", urgency: "Medium" },
  { id: "3", hospital: "HopeCare Clinic", bloodType: "B+", distance: "1.2 km", urgency: "High" },
];

// Mock user
const mockUser = { name: "Danjuma Nathaniel", bloodType: "O+", profilePic: null };

export default function DashboardScreen({ navigation }) {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <Card
      title={item.hospital}
      subtitle={`Blood Type Needed: ${item.bloodType} | Distance: ${item.distance}`}
      style={{ borderLeftWidth: 5, borderLeftColor: item.urgency === "High" ? colors.primary : colors.secondary }}
    >
      <Button
        title="Accept Request"
        onPress={() => alert(`Accepted request for ${item.hospital}`)}
        style={{ marginTop: sizes.base }}
      />
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false} style={{ backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        {/* User Info + Notification */}
        <Card style={styles.userCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.profilePic}>
              {mockUser.profilePic ? (
                <Image source={{ uri: mockUser.profilePic }} style={styles.profilePic} />
              ) : (
                <Text style={{ color: colors.background, fontSize: fontSizes.large }}>
                  {mockUser.name[0]}
                </Text>
              )}
            </View>
            <View style={{ marginLeft: sizes.base }}>
              <Text style={[styles.userName, { color: colors.text }]}>{mockUser.name}</Text>
              <Text style={[styles.userBlood, { color: colors.primary }]}>
                Blood Type: {mockUser.bloodType}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("My Requests")}>
            <Text style={{ fontSize: 24, color: colors.primary }}></Text>
          </TouchableOpacity>
        </Card>

        {/* Dashboard Title */}
        <Text style={[styles.title, { color: colors.text }]}>Nearby Blood Requests 🩸</Text>

        {/* Blood Requests List */}
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
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: sizes.padding,
    marginBottom: sizes.padding,
    borderRadius: sizes.radius,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
  },
  userBlood: {
    fontSize: fontSizes.medium,
  },
});
