// import { Image } from 'expo-image';
// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';
import { Button, createTheme, ThemeProvider } from "@rneui/themed";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../../../global.css";

const categories = ["Home", "Explore", "Profile", "Settings", "Help"];
export default function HomeScreen() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createTheme({
    lightColors: {
      primary: "#3A83F4",
      secondary: "#09B5D3",
      background: "#FFFFFF",
      black: "#000000",
      grey0: "#F5F5F5",
    },
    darkColors: {
      primary: "#5A9FFF",
      secondary: "#2AC9E8",
      background: "#1A1A1A",
      black: "#FFFFFF",
      grey0: "#333333",
    },
    mode: mode,
  });

  const toggleTheme = () => {
    return setMode(mode === "light" ? "dark" : "light");
  };

  const currentColors = mode === "light" ? theme.lightColors : theme.darkColors;

  if (!currentColors) {
    return null;
  }

  const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: 15,
      backgroundColor: currentColors.background,
    },
    container: {
      marginTop: 1,
      backgroundColor: currentColors.background,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: currentColors.black,
    },
    subtitle: {
      fontSize: 16,
      color: currentColors.grey0,
    },
    subtitleContainer: {
      flexDirection: "row",
    },
    separator: {
      height: 1,
      backgroundColor: currentColors.black,
      marginVertical: 10,
    },
    categoryButton: {
      backgroundColor: currentColors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: 10,
      borderRadius: 5,
    },
    categoryText: {
      color: currentColors.grey0,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: currentColors.primary,
      borderRadius: 20,
      marginTop: 20,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hello There!</Text>
          </View>
          <View style={styles.separator} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={{ backgroundColor: currentColors.primary }}
              className="p-3 px-4 rounded-full mr-2"
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="mt-3">
          <Button
            onPress={toggleTheme}
            buttonStyle={styles.button}
            titleStyle={{ color: currentColors.grey0 }}
          >
            Switch to {mode === "light" ? "dark" : "light"} mode
          </Button>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
}
