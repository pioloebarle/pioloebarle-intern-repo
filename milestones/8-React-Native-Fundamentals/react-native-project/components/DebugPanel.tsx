import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const DebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Debug Toggle Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.buttonText}>🐛 Debug</Text>
      </TouchableOpacity>

      {/* Debug Info Box */}
      {isVisible && (
        <View style={styles.infoBox}>
          <Text style={styles.title}>Debug Mode Active</Text>
          <Text style={styles.info}>📱 Check terminal for logs</Text>
          <Text style={styles.info}>⏱️ {new Date().toLocaleTimeString()}</Text>
          <Text style={styles.hint}>
            Use log.info(), log.warn(), log.error()
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 9999,
  },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#0f0",
    fontWeight: "bold",
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#0f0",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    width: 220,
  },
  title: {
    color: "#0f0",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 8,
  },
  info: {
    color: "#0f0",
    fontSize: 10,
    marginBottom: 4,
    fontFamily: "monospace",
  },
  hint: {
    color: "#666",
    fontSize: 9,
    marginTop: 8,
    fontStyle: "italic",
  },
});

export default DebugPanel;
