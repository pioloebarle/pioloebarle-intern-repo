import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeMessage() {
  const [name, setName] = useState(false);
  const fullName = "Piolo Pascual E. Besinga";

  return (
    <View>
      <Text style={styles.message}>
        Welcome, {name ? ` ${fullName}!` : "Guest!"}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => setName(true)}
          style={styles.buttonStyle}
        >
          <Text>Set Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setName(false)}
          style={styles.buttonStyle}
        >
          <Text>Reset Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});
