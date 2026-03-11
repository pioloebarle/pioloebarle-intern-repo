import { IconSymbol } from "@/components/ui/icon-symbol";
import { Drawer } from "expo-router/drawer";
import { Platform, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeDrawerLayout() {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const HEADER_HEIGHT = Platform.select({
    ios: SCREEN_HEIGHT * 0.12,
    android: SCREEN_HEIGHT * 0.1,
    default: 60,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerStyle: {
            height: HEADER_HEIGHT,
          },
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "500",
          },
          drawerActiveTintColor: "#3A83F4",
          drawerInactiveTintColor: "#666",
          drawerActiveBackgroundColor: "#E3F2FD",
          drawerStyle: {
            backgroundColor: "#FFFFFF",
            width: 250,
          },
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: "300",
            height: 20,
          },
          drawerItemStyle: {
            padding: 1,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <IconSymbol name="house.fill" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <IconSymbol name="gearshape.fill" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="performance"
          options={{
            drawerLabel: "Performance",
            title: "Performance Demo",
            drawerIcon: ({ color, size }) => (
              <IconSymbol name="gearshape.fill" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="addition"
          options={{
            drawerLabel: "Addition",
            title: "Addition Demo",
            drawerIcon: ({ color, size }) => (
              <IconSymbol name="gearshape.fill" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="welcome"
          options={{
            drawerLabel: "Welcome",
            title: "Welcome Message",
            drawerIcon: ({ color, size }) => (
              <IconSymbol name="gearshape.fill" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
