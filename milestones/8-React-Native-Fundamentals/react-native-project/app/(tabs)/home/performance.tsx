import PerformanceDemo from "@/components/PerformanceDemo";
import { ScrollView } from "react-native";

export default function PerformanceScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <PerformanceDemo />
    </ScrollView>
  );
}
