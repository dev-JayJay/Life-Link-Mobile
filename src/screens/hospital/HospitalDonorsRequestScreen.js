import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { useGetHospitalRequestsQuery, useAcceptRequestMutation, useRejectRequestMutation } from "../../api/bloodRequestApi";

export default function HospitalDonorsRequestScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch hospital requests
  const { data, isLoading, isError } = useGetHospitalRequestsQuery();

  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();

  const requests = data?.data || [];

  // Categorize requests by status
  const categorizedRequests = {
    pending: requests.filter(r => r.status === "pending"),
    accepted: requests.filter(r => r.status === "accepted"),
    rejected: requests.filter(r => r.status === "rejected"),
  };

  const TAB_DATA = {
    pending: {
      title: "Incoming",
      data: categorizedRequests.pending,
    },
    accepted: {
      title: "Accepted",
      data: categorizedRequests.accepted,
    },
    rejected: {
      title: "Rejected",
      data: categorizedRequests.rejected,
    },
  };

  const active = TAB_DATA[activeTab];

  const handleAccept = async (id) => {
    try {
      await acceptRequest(id).unwrap();
      Alert.alert("Accepted", "You have accepted the donor request.");
    } catch (err) {
      Alert.alert("Error", "Failed to accept the request.");
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id).unwrap();
      Alert.alert("Rejected", "You have rejected the donor request.");
    } catch (err) {
      Alert.alert("Error", "Failed to accept the request.");
      console.error(err);
    }
  };


  const renderRequest = ({ item }) => (
    <Card>
      <Text style={[styles.name, { color: colors.text }]}>
        {item.user ? item.user.fullName : "Anonymous Donor"}
      </Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Units: {item.units}
      </Text>
      <Text style={[styles.detail, { color: colors.subText }]}>
        Status: {item.status}
      </Text>
      {item.notes && (
        <Text style={[styles.detail, { color: colors.subText }]}>
          Notes: {item.notes}
        </Text>
      )}

      {item.status === "pending" && (
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.acceptBtn, { backgroundColor: colors.primary }]}
            onPress={() => handleAccept(item.id)}
          >
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.declineBtn, { backgroundColor: "#d9534f" }]}
            onPress={() => handleReject(item.id)}
          >
            <Text style={styles.btnText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {Object.keys(TAB_DATA).map((tab) => (
          <TabButton
            key={tab}
            label={TAB_DATA[tab].title}
            active={activeTab === tab}
            onPress={() => setActiveTab(tab)}
            colors={colors}
          />
        ))}
      </View>

      {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
      {isError && (
        <Text style={{ color: "red", textAlign: "center" }}>
          Failed to load requests.
        </Text>
      )}
      {!isLoading && active.data.length === 0 && (
        <Text style={{ color: colors.subText, textAlign: "center", marginTop: 20 }}>
          No requests in this category.
        </Text>
      )}

      <FlatList
        data={active.data}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
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
      style={[styles.tabButton, { borderBottomColor: active ? colors.primary : "transparent" }]}
    >
      <Text style={[styles.tabText, { color: active ? colors.primary : colors.subText }]}>
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
  name: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
  },
  detail: {
    fontSize: fontSizes.medium,
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
