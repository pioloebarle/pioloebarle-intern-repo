import WelcomeMessage from "@/components/WelcomeMessage";
import { ScrollView } from "react-native";

export default function WelcomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <WelcomeMessage />
    </ScrollView>
  );
}
