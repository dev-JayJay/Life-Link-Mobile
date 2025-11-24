import React from "react";
import { FlatList, StyleSheet, Text, ActivityIndicator, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { fontSizes, fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { useGetUserRequestsQuery } from "../../api/bloodRequestApi";

export default function MyRequestsScreen() {
  const { colors } = useTheme();

  // Fetch API data
  const { data, isLoading, isError } = useGetUserRequestsQuery();
  const requests = data?.data || [];
  
  const renderItem = ({ item }) => (
    <Card>
      <Text style={[styles.hospital, { color: colors.text }]}>
        {item.hospital?.name || "Unknown Hospital"}
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

      {item.notes ? (
        <Text style={[styles.detail, { color: colors.subText }]}>
          Notes: {item.notes}
        </Text>
      ) : null}
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <Text style={[styles.title, { color: colors.text }]}>My Requests</Text>

      {isLoading && (
        <ActivityIndicator size="large" color={colors.primary} />
      )}

      {isError && (
        <Text style={{ color: "red", textAlign: "center" }}>
          Failed to load your requests.
        </Text>
      )}

      {!isLoading && data?.length === 0 && (
        <Text style={{ color: colors.subText, textAlign: "center", marginTop: 20 }}>
          You have no requests yet.
        </Text>
      )}

      <FlatList
        data={requests}
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
