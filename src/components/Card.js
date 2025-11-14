import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../constants/theme";
import { sizes } from "../constants/sizes";
import { fonts, fontSizes } from "../constants/fonts";

const Card = ({ title, subtitle, children, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }, style]}>
      {title && (
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.subText }]}>{subtitle}</Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: sizes.radius,
    padding: sizes.padding,
    marginVertical: sizes.base,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: fontSizes.large,
  },
  subtitle: {
    fontSize: fontSizes.medium,
    marginTop: 4,
  },
});

export default Card;
