import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import axiosInstance from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

/**
 * UserList component - Fetches and displays users from API
 * This component demonstrates API integration for testing purposes
 */
export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer} testID="loading-indicator">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer} testID="error-container">
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Empty state
  if (users.length === 0) {
    return (
      <View style={styles.centerContainer} testID="empty-container">
        <Text style={styles.emptyText}>No users found</Text>
      </View>
    );
  }

  // User list
  return (
    <View style={styles.container} testID="user-list-container">
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        testID="user-list"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard} testID={`user-${item.id}`}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userUsername}>@{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  userCard: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: "#007AFF",
  },
});
