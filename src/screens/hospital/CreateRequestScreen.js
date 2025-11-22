import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Card from "../../components/Card";
import Button from "../../components/Button";

import { useTheme } from "../../constants/theme";
import { fonts, fontSizes } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { useSelector } from "react-redux";
import { useCreateBloodRequestMutation } from "../../api/bloodRequestApi";

export default function CreateRequestScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, hospital, token, role } = useSelector((state) => state.auth);

  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [notes, setNotes] = useState("");

  const [createBloodRequest, { isLoading }] = useCreateBloodRequestMutation();

  const hospitalData = {
    hospitalId: hospital?.id,
    latitude: hospital?.latitude,
    longitude: hospital?.longitude,
  };

  // console.log("this is the hospital data", hospitalData);

  const handleSubmit = async () => {
    if (!bloodType || !units) {
      Toast.show({ type: "error", text1: "Please fill all required fields" });
      return;
    }

    try {
      const res = await createBloodRequest({
        hospitalId: hospitalData.hospitalId,
        bloodType,
        units,
        urgency,
        notes,
        latitude: hospitalData.latitude,
        longitude: hospitalData.longitude,
      }).unwrap();
      console.log("this is the response for creating", res);

      Toast.show({ type: "success", text1: "Blood request submitted!" });

      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed to submit request",
        text2: err?.data?.error || "Something went wrong",
      });
    }
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

      <Text style={[styles.title, { color: colors.text }]}>
        Create Blood Request 🩸
      </Text>

      <Card>
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

        <Text style={[styles.label, { color: colors.subText }]}>Urgency</Text>
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

        <Text style={[styles.label, { color: colors.subText }]}>Notes</Text>
        <TextInput
          placeholder="Additional information"
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
        title={isLoading ? "Submitting..." : "Submit Request"}
        onPress={handleSubmit}
        disabled={isLoading}
        style={{ marginTop: sizes.padding }}
      />
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
