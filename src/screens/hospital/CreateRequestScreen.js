import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import Button from "../../components/Button";

import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

export default function CreateRequestScreen({ navigation }) {
  const { colors } = useTheme();

  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    alert("Blood request submitted!");
  };

  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Create Blood Request
        </Text>
      </View>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>
          Create Blood Request 🩸
        </Text>

        <Card>
          {/* Blood Type */}
          <Text style={[styles.label, { color: colors.subText }]}>
            Blood Type Needed
          </Text>
          <TextInput
            placeholder="e.g. O+"
            placeholderTextColor={colors.subText}
            value={bloodType}
            onChangeText={setBloodType}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
          />

          {/* Units */}
          <Text style={[styles.label, { color: colors.subText }]}>
            Units Needed
          </Text>
          <TextInput
            placeholder="e.g. 2"
            placeholderTextColor={colors.subText}
            value={units}
            onChangeText={setUnits}
            keyboardType="numeric"
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
          />

          {/* Urgency */}
          <Text style={[styles.label, { color: colors.subText }]}>
            Urgency Level
          </Text>

          <View style={styles.urgencyRow}>
            {["Normal", "High"].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setUrgency(level)}
                style={[
                  styles.urgencyBtn,
                  {
                    backgroundColor:
                      urgency === level ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: urgency === level ? colors.background : colors.text,
                    fontFamily: fonts.medium,
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes */}
          <Text style={[styles.label, { color: colors.subText }]}>Notes</Text>
          <TextInput
            placeholder="Additional information (optional)"
            placeholderTextColor={colors.subText}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            style={[
              styles.textArea,
              { borderColor: colors.border, color: colors.text },
            ]}
          />
        </Card>

        <Button
          title="Submit Request"
          onPress={handleSubmit}
          style={{ marginTop: sizes.padding }}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: sizes.padding,
  },
  headerTitle: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginLeft: sizes.base,
  },
  title: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginBottom: sizes.padding,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginTop: sizes.base,
  },
  input: {
    borderWidth: 1,
    borderRadius: sizes.radius,
    padding: sizes.base,
    marginTop: 4,
    fontFamily: fonts.regular,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: sizes.radius,
    padding: sizes.base,
    marginTop: 4,
    height: 100,
    textAlignVertical: "top",
    fontFamily: fonts.regular,
  },
  urgencyRow: {
    flexDirection: "row",
    marginTop: 8,
    columnGap: 10,
  },
  urgencyBtn: {
    flex: 1,
    padding: sizes.base,
    borderWidth: 1,
    borderRadius: sizes.radius,
    alignItems: "center",
  },
});
