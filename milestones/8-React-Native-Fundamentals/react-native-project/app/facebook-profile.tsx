import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function FacebookProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleOpenFacebook = async () => {
    const facebookUrl = `https://www.facebook.com/${id}`;
    try {
      await Linking.openURL(facebookUrl);
    } catch (error) {
      console.error("Failed to open Facebook:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facebook Profile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Profile ID:</Text>
        <Text style={styles.value}>{id || "No ID provided"}</Text>
        <TouchableOpacity style={styles.button} onPress={handleOpenFacebook}>
          <Text style={styles.buttonText}>Open on Facebook</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.info}>
        This screen was opened via deep link:{"\n"}
        <Text style={styles.code}>reactnativeproject://facebook/{id}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1877F2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  code: {
    fontSize: 12,
    fontFamily: "monospace",
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
