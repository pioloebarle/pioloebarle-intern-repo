import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DeepLinkTester() {
  const router = useRouter();
  const [lastLink, setLastLink] = useState<string>("No link tested yet");
  const [testCount, setTestCount] = useState(0);

  const deepLinks = [
    { name: "Home Screen", url: "home", isInternal: true },
    { name: "Debugging Screen", url: "home/debugging", isInternal: true },
    { name: "Error Simulator", url: "home/errorSimulator", isInternal: true },
    { name: "Deep Link Test", url: "home/deeplink", isInternal: true },
    {
      name: "Facebook Profile (Mine)",
      url: "facebook-profile",
      isInternal: true,
      params: { id: "100002416303195" },
    },
  ];

  const testDeepLink = async (
    url: string,
    name: string,
    isInternal: boolean,
    params?: Record<string, any>,
  ) => {
    try {
      if (isInternal) {
        if (params) {
          router.push({ pathname: url as any, params });
        } else {
          router.push(url as any);
        }
      } else {
        await Linking.openURL(url);
      }
      setLastLink(`Successfully opened: ${name}`);
      setTestCount((prev) => prev + 1);
    } catch {
      Alert.alert("Error", `Failed to open link: ${name}`);
      setLastLink(`Failed to open: ${name}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Deep Linking Test</Text>
        <Text style={styles.subtitle}>Test your deep links here</Text>
      </ScrollView>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Last Link Opened:</Text>
        <Text style={styles.statusText}>{lastLink}</Text>
        <Text style={styles.statusLabel}>Total Tests Run:</Text>
        <Text>{testCount}</Text>
      </View>

      {deepLinks.map((link, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() =>
            testDeepLink(link.url, link.name, link.isInternal, link.params)
          }
        >
          <Text style={styles.buttonText}>{link.name}</Text>
          <Text style={styles.buttonSubText}>{link.url}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    borderLeftWidth: 4,
    borderLeftColor: "#0f0",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: "#2c15a1",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  buttonSubText: {
    color: "#b0b0b0",
    fontStyle: "italic",
  },
});
