import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTheme } from "../../constants/theme";
import { sizes } from "../../constants/sizes";
import { fonts, fontSizes } from "../../constants/fonts";
import { Picker } from "@react-native-picker/picker";


export default function NewDonationRequestScreen() {
  const { colors } = useTheme();

  const [bloodType, setBloodType] = useState("O+");
  const [notes, setNotes] = useState("");

  const handleSendRequest = () => {
    alert(`Request sent for blood type ${bloodType}`);
  };

  return (
    <ScreenWrapper scrollable>
      <Text style={[styles.title, { color: colors.text }]}>Donate Blood</Text>

      <Card style={{ paddingVertical: sizes.padding }}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>
            Blood Type
          </Text>

          <View
            style={[
              styles.pickerWrapper,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <Picker
              selectedValue={bloodType}
              onValueChange={(value) => setBloodType(value)}
              dropdownIconColor={colors.text}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Select blood type" value="" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O−" value="O-" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A−" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B−" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB−" value="AB-" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subText }]}>Notes</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Any additional info"
          />
        </View>

        <Button
          title="Send Request"
          onPress={handleSendRequest}
          style={{ marginTop: sizes.padding }}
        />
      </Card>
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
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },

  inputGroup: { marginBottom: sizes.base },
  label: {
    fontSize: fontSizes.medium,
    fontFamily: fonts.medium,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: sizes.radius,
    padding: sizes.base,
    fontFamily: fonts.regular,
  },
});
