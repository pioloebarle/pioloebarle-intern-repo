import ErrorSimulator from "@/components/ErrorSimulator";
import { ScrollView } from "react-native";

export default function AdditionScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <ErrorSimulator />
    </ScrollView>
  );
}