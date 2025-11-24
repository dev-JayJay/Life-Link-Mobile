import React from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useTheme } from "../../constants/theme";
import { sizes } from "../../constants/sizes";
import { fonts, fontSizes } from "../../constants/fonts";
import { useGetHospitalRequestsQuery } from "../../api/bloodRequestApi";


export default function AcceptedRequestsScreen() {
  const { colors } = useTheme();

  const { data, isLoading, isError } = useGetHospitalRequestsQuery();

  // Handle API states
  if (isLoading) return (
    <ScreenWrapper>
      <ActivityIndicator size="large" color={colors.primary} />
    </ScreenWrapper>
  );

  if (isError) return (
    <ScreenWrapper>
      <Text style={{ color: colors.error, textAlign: "center" }}>
        Failed to load requests
      </Text>
    </ScreenWrapper>
  );

  // Filter only accepted requests
  const acceptedRequests = data?.requests?.filter(req => req.status === "accepted") || [];

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: sizes.base }}>
      <Text style={[styles.donor, { color: colors.text }]}>
        {item?.user?.fullName || "Unknown Donor"}
      </Text>

      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Type: {item.bloodType}
      </Text>

      {item.notes && (
        <Text style={[styles.detail, { color: colors.subText }]}>
          Notes: {item.notes}
        </Text>
      )}

      <Button
        title="Mark as Completed"
        onPress={() => alert(`Request from ${item?.user?.fullName} marked completed`)}
        style={{ marginTop: sizes.base }}
      />
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <Text style={[styles.title, { color: colors.text }]}>Accepted Requests</Text>

      {acceptedRequests.length === 0 ? (
        <Text style={{ color: colors.subText, textAlign: "center", marginTop: 20 }}>
          No accepted requests yet
        </Text>
      ) : (
        <FlatList
          data={acceptedRequests}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
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
