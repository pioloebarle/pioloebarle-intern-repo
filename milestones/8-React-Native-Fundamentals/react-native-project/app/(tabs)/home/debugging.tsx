// eslint-disable-next-line import/no-named-as-default
import DebuggingExample from "@/components/DebuggingExample";
import { ScrollView } from "react-native";

export default function AdditionScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <DebuggingExample />
    </ScrollView>
  );
}
