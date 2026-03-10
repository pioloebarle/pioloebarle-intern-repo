import Addition from "@/components/AdditionCalculator";
import { ScrollView } from "react-native";

export default function AdditionScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Addition />
    </ScrollView>
  );
}
