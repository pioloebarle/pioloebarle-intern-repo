import DeepLinkTester from "@/components/DeepLinkTester";
import { ScrollView } from "react-native";

export default function AdditionScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <DeepLinkTester />
    </ScrollView>
  );
}
