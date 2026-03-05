// import { Image } from 'expo-image';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../../global.css";

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';
const categories = ["Home", "Explore", "Profile", "Settings", "Help"];

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["rgba(58, 131, 244, 0.4)", "rgba(9, 181, 211, 0.4)"]}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <FontAwesome6 name="bars" size={24} color="black" className="mb-3" />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hello There!</Text>
          </View>
          <View style={styles.separator} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className="bg-blue-200 p-3 px-4 rounded-full mr-2"
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    marginTop: 30,
    padding: 2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  categoryText: {
    color: "black",
    fontWeight: "bold",
  },
});
