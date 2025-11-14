import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useTheme } from "../constants/theme";
import { sizes } from "../constants/sizes";

const Input = ({ value, onChangeText, placeholder, secureTextEntry, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <TextInput
        style={[styles.input, { color: colors.text }, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: sizes.radius,
    paddingHorizontal: sizes.padding / 2,
    marginVertical: sizes.base,
  },
  input: {
    height: 48,
    fontSize: 16,
  },
});

export default Input;
