import React from "react";
import { Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { sizes } from "../../constants/sizes";
import { fonts, fontSizes } from "../../constants/fonts";
import { useGetHospitalDonationsQuery } from "../../api/hospitalApi";

export default function RecentDonorsScreen() {
  const { colors } = useTheme();

  const { data, isLoading, isError } = useGetHospitalDonationsQuery();
  console.log("this is the recent donor data", data);

  const donors = data?.data || [];

  if (isLoading)
    return (
      <ScreenWrapper>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenWrapper>
    );

  if (isError)
    return (
      <ScreenWrapper>
        <Text style={{ color: colors.error, textAlign: "center" }}>
          Failed to load donors.
        </Text>
      </ScreenWrapper>
    );

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: sizes.base }}>
      <Text style={[styles.name, { color: colors.text }]}>
        {item.donor.fullName}
      </Text>

      <Text style={[styles.detail, { color: colors.subText }]}>
        Blood Group: {item.donor.bloodGroup}
      </Text>

      <Text style={[styles.detail, { color: colors.subText }]}>
        Units Donated: {item.quantity}
      </Text>

      <Text style={[styles.detail, { color: colors.subText }]}>
        Date: {new Date(item.date).toLocaleDateString()}
      </Text>
    </Card>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <Text style={[styles.title, { color: colors.text }]}>
        Recent Donors
      </Text>

      <FlatList
        data={donors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
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
  name: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
  },
  detail: {
    fontSize: fontSizes.medium,
    marginTop: 2,
  },
});
