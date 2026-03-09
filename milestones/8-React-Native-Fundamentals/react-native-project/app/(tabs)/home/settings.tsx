import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../../../global.css";

const preferences = [
  "Notifications",
  "Accessibility",
  "Language",
  "Media",
  "Dark Mode",
];

const activities = [
  "Activity log",
  "Device permissions",
  "Apps and websites",
  "Business integrations",
  "Learn how to manage your information",
];

const activitiesIcons = [
  { library: AntDesign, name: "bars", size: 24, color: "black" },
  { library: Octicons, name: "device-mobile", size: 24, color: "black" },
  { library: Feather, name: "box", size: 24, color: "black" },
  { library: Ionicons, name: "bag-handle-outline", size: 24, color: "black" },
  {
    library: MaterialCommunityIcons,
    name: "help-box-multiple-outline",
    size: 24,
    color: "black",
  },
];

const preferencesIcons = [
  {
    library: Ionicons,
    name: "notifications-outline",
    size: 24,
    color: "black",
  },
  { library: MaterialIcons, name: "accessibility", size: 24, color: "black" },
  { library: MaterialIcons, name: "language", size: 24, color: "black" },
  { library: MaterialIcons, name: "perm-media", size: 24, color: "black" },
  { library: Feather, name: "moon", size: 24, color: "black" },
];

export default function SettingsScreen() {
  const [query, setQuery] = useState("");

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <SearchBar
          placeholder="Search settings"
          onChangeText={setQuery}
          value={query}
          lightTheme
          //   round
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Account</Text>
      </View>
      <View style={styles.accountContentContainer}>
        <Ionicons name="person-circle-outline" size={30} color="black" />
        <View style={styles.accountContent}>
          <Text
            style={{ fontWeight: "bold", fontSize: 14, paddingHorizontal: 15 }}
          >
            Piolo Pascual Besinga
          </Text>
          <Text style={{ paddingHorizontal: 15, color: "gray", fontSize: 12 }}>
            Personal Details, Password, Manage Addresses, Security
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { marginBottom: 6 }]}>Preferences</Text>
      </View>
      {preferences.map((preference, index) => {
        const IconComponent = preferencesIcons[index]
          .library as React.ComponentType<any>;
        const iconProps = preferencesIcons[index];
        return (
          <TouchableOpacity key={preference} style={styles.touchContainer}>
            <IconComponent {...iconProps} />
            <Text>{preference}</Text>
          </TouchableOpacity>
        );
      })}
      ,
      <View style={styles.separator} />
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { marginBottom: 6 }]}>Your Activity</Text>
      </View>
      {activities.map((activity, index) => {
        const IconComponent = activitiesIcons[index]
          .library as React.ComponentType<any>;
        const iconProps = activitiesIcons[index];
        return (
          <TouchableOpacity key={activity} style={styles.touchContainer}>
            <IconComponent {...iconProps} />
            <Text>{activity}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  container: {
    paddingTop: 10,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: 50,
  },
  searchInputContainer: {
    backgroundColor: "#F5F5F5",
    height: 40,
    minHeight: 40,
    borderRadius: 50,
  },
  searchInput: {
    fontSize: 14,
    paddingVertical: 0,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
  },
  headerContainer: {
    flex: 1,
    marginTop: 6,
  },
  accountContentContainer: {
    flexDirection: "row",
    gap: 3,
    marginTop: 10,
  },
  accountContent: {
    flex: 1,
  },
  touchContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
    flexDirection: "column",
  },
});
