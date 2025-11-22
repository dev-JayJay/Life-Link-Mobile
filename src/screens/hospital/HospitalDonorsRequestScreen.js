import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

// Incoming donor requests
const incomingDonorsList = [
  { id: "1", name: "John Doe", bloodType: "O+", time: "5 mins ago" },
  { id: "2", name: "Sarah Lee", bloodType: "A+", time: "12 mins ago" },
];

const recentDonors = [
  { id: "3", name: "Michael Cruz", bloodType: "B-", date: "Yesterday" },
  { id: "4", name: "Anna Kim", bloodType: "AB+", date: "2 days ago" },
];

const matchedDonors = [
  { id: "5", name: "Emma Stone", bloodType: "O+", distance: "2 km" },
  { id: "6", name: "James Allen", bloodType: "A-", distance: "4 km" },
  { id: "7", name: "Mark Dylan", bloodType: "B+", distance: "1.5 km" },
];

export default function HospitalDonorsRequestScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("incoming");
  const [incomingDonors, setIncomingDonors] = useState(incomingDonorsList);

  const handleAccept = (id) => {
    Alert.alert("Accepted", "You have accepted the donor request.");
    setIncomingDonors((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDecline = (id) => {
    Alert.alert("Declined", "You have declined the donor request.");
    setIncomingDonors((prev) => prev.filter((item) => item.id !== id));
  };

  const renderIncoming = ({ item }) => (
    <Card>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>
      <Text style={[styles.subDetail, { color: colors.subText }]}>
        Requested: {item.time}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.primary }]}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.btnText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.declineBtn, { backgroundColor: "#d9534f" }]}
          onPress={() => handleDecline(item.id)}
        >
          <Text style={styles.btnText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderRecent = ({ item }) => (
    <Card>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>
      <Text style={[styles.subDetail, { color: colors.subText }]}>
        Donated: {item.date}
      </Text>
    </Card>
  );

  const renderMatched = ({ item }) => (
    <Card>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>
      <Text style={[styles.subDetail, { color: colors.subText }]}>
        Distance: {item.distance}
      </Text>
    </Card>
  );

  const TAB_DATA = {
    incoming: {
      title: "Incoming Requests",
      data: incomingDonors,
      renderItem: renderIncoming,
    },
    recent: {
      title: "Recent Donors",
      data: recentDonors,
      renderItem: renderRecent,
    },
    matched: {
      title: "Matched Donors",
      data: matchedDonors,
      renderItem: renderMatched,
    },
  };

  const active = TAB_DATA[activeTab];

  return (
    <ScreenWrapper scrollable={false}>
      {/* TOP SWITCH TABS */}
      <View style={styles.tabContainer}>
        <TabButton
          label="Incoming"
          active={activeTab === "incoming"}
          onPress={() => setActiveTab("incoming")}
          colors={colors}
        />
        <TabButton
          label="Recent"
          active={activeTab === "recent"}
          onPress={() => setActiveTab("recent")}
          colors={colors}
        />
        <TabButton
          label="Matched"
          active={activeTab === "matched"}
          onPress={() => setActiveTab("matched")}
          colors={colors}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {active.title}
      </Text>

      <FlatList
        data={active.data}
        keyExtractor={(item) => item.id}
        renderItem={active.renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </ScreenWrapper>
  );
}

function TabButton({ label, active, onPress, colors }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabButton,
        { borderBottomColor: active ? colors.primary : "transparent" },
      ]}
    >
      <Text
        style={[
          styles.tabText,
          { color: active ? colors.primary : colors.subText },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: sizes.padding,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: sizes.base,
    borderBottomWidth: 3,
  },
  tabText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
  },
  sectionTitle: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: sizes.base,
  },
  name: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
  },
  detail: {
    fontSize: fontSizes.medium,
    marginTop: 2,
  },
  subDetail: {
    fontSize: fontSizes.small,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    marginTop: sizes.base,
    justifyContent: "space-between",
  },
  acceptBtn: {
    flex: 1,
    padding: sizes.base,
    borderRadius: sizes.radius,
    alignItems: "center",
    marginRight: 5,
  },
  declineBtn: {
    flex: 1,
    padding: sizes.base,
    borderRadius: sizes.radius,
    alignItems: "center",
    marginLeft: 5,
  },
  btnText: {
    color: "white",
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
  },
});
