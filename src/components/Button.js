import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../constants/theme";
import { fonts, fontSizes } from "../constants/fonts";
import { sizes } from "../constants/sizes";

const Button = ({ title, onPress, loading, disabled, style, textStyle }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.subText : colors.primary },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: colors.background, fontFamily: fonts.medium },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: sizes.radius,
    paddingVertical: sizes.base * 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: sizes.base,
  },
  text: {
    fontSize: fontSizes.medium,
  },
});

export default Button;
