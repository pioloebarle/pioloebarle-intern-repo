import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Addition() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleAddition = () => {
    const firstNumber = parseFloat(firstNum);
    const secondNumber = parseFloat(secondNum);
    if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
      setResult(firstNumber + secondNumber);
    } else {
      setResult(null);
    }
  };

  return (
    <View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="First Number"
          value={firstNum}
          onChangeText={setFirstNum}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Second Number"
          value={secondNum}
          onChangeText={setSecondNum}
          keyboardType="numeric"
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity onPress={handleAddition} style={styles.button}>
        <Text>Add (+)</Text>
      </TouchableOpacity>

      {result !== null && <Text style={styles.result}>Sum: {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "40%",
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
