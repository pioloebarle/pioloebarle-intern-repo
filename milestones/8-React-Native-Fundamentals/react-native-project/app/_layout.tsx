import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { initSentry } from "@/utils/sentrySetup";

export const unstable_settings = {
  anchor: "(tabs)",
};

export const linking = {
  prefixes: ["reactnativeproject://", "https://reactnativeproject.com"],
  config: {
    screens: {
      "(tabs)": {
        screens: {
          "home/index": "home",
          "home/debugging": "debugging",
          "home/errorSimulator": "error",
          "home/deeplink": "deeplink",
        },
      },
      modal: "modal",
      "facebook-profile": "facebook/:id",
    },
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initSentry();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
