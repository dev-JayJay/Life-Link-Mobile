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

import {
  useAcceptRequestMutation,
  useGetAllBloodRequestsQuery,
} from "../../api/bloodRequestApi";
import { useSelector } from "react-redux";

export default function DashboardScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, bloodType } = useSelector((state) => state.auth);

  // Fetch live requests
  const { data, isLoading, error } = useGetAllBloodRequestsQuery();
  const [acceptRequest] = useAcceptRequestMutation();

  const renderItem = ({ item }) => {
    const urgencyColor =
      item.urgency === "High" ? colors.primary : colors.secondary;

    return (
      <Card
        title={item.hospital?.name || "Unknown Hospital"}
        subtitle={`Blood Type Needed: ${item.bloodType} | Units: ${item.units}`}
        style={{
          borderLeftWidth: 5,
          borderLeftColor: urgencyColor,
        }}
      >
        <Button
          title="Accept Request"
          onPress={async () => {
            try {
              await acceptRequest({
                requestId: item.id,
                donorId: user.id,
              }).unwrap();
              Toast.show({ type: "success", text1: "Request Accepted!" });
            } catch (err) {
              Toast.show({
                type: "error",
                text1: "Failed to accept request",
                text2: err?.data?.error || "Something went wrong",
              });
            }
          }}
          style={{ marginTop: sizes.base }}
        />
      </Card>
    );
  };

  return (
    <ScreenWrapper
      scrollable={false}
      style={{ backgroundColor: colors.background }}
    >
      <View style={{ flex: 1 }}>
        {/* User Info */}
        <Card style={styles.userCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.profilePic}>
              {user?.fullName ? (
                <Text
                  style={{
                    color: colors.background,
                    fontSize: fontSizes.large,
                  }}
                >
                  {user.fullName[0]}
                </Text>
              ) : null}
            </View>

            <View style={{ marginLeft: sizes.base }}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.fullName}
              </Text>
              <Text style={[styles.userBlood, { color: colors.primary }]}>
                Blood Type: {user?.bloodType || "Unknown"}
              </Text>
            </View>
          </View>
        </Card>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          Nearby Blood Requests 🩸
        </Text>

        {/* Loading / Error Handling */}
        {isLoading && <Text style={{ color: colors.text }}>Loading...</Text>}
        {error && <Text style={{ color: "red" }}>Failed to load requests</Text>}

        {/* Blood Requests */}
        <FlatList
          data={data || []}
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
