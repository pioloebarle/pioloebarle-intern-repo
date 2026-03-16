import networkDebugger from "@/utils/networkDebugger";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import axiosInstance from "../services/api";
import { log } from "../utils/debugLogger";

export default function DebuggingExample() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("Ready to debug");

  // Test 1: Metro logs
  const testMetroLogs = () => {
    log.info("Testing Metro logs");
    log.debug("This is a debug message", { test: true });
    log.warn("This is a warning");
    log.success("Logs are working!");
    setDebugInfo("✅ Check terminal for logs");
  };

  // Test 2: Network debugging
  const testNetworkRequest = async () => {
    setLoading(true);
    setDebugInfo("📡 Fetching posts...");

    try {
      const { startTime } = networkDebugger.logRequest("GET", "/posts");

      const response = await axiosInstance.get("/posts?_limit=3");

      networkDebugger.logResponse("GET", "/posts", response.status, startTime);
      log.success("Posts fetched successfully", {
        count: response.data.length,
      });

      setPosts(response.data);
      setDebugInfo(`✅ Loaded ${response.data.length} posts`);
    } catch (error) {
      const { startTime } = networkDebugger.logRequest("GET", "/posts");
      networkDebugger.logError("GET", "/posts", error, startTime);
      log.error("Failed to fetch posts", error);
      setDebugInfo("❌ Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Component state debugging
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    const newValue = counter + 1;
    setCounter(newValue);
    log.debug("Counter updated", { oldValue: counter, newValue });
    // React DevTools will show this state change
  };

  // Test 4: Show network logs
  const showNetworkLogs = () => {
    const logs = networkDebugger.getLogs();
    log.info(`Network requests (${logs.length} total):`, logs);
    setDebugInfo(`📊 ${logs.length} network requests logged`);
  };

  useEffect(() => {
    log.info("DebuggingExample component mounted");
    return () => log.info("DebuggingExample component unmounted");
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Debugging Example</Text>
      <Text style={styles.subtitle}>{debugInfo}</Text>

      {/* Metro Logs Test */}
      <TouchableOpacity style={styles.button} onPress={testMetroLogs}>
        <Text style={styles.buttonText}>Test Metro Logs</Text>
      </TouchableOpacity>

      {/* Network Debugging Test */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={testNetworkRequest}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Test Network Request"}
        </Text>
      </TouchableOpacity>

      {/* Counter for React DevTools */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Counter (Check React DevTools)</Text>
        <Text style={styles.counter}>{counter}</Text>
        <TouchableOpacity style={styles.button} onPress={incrementCounter}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
      </View>

      {/* Network Logs Display */}
      <TouchableOpacity style={styles.button} onPress={showNetworkLogs}>
        <Text style={styles.buttonText}>Show Network Logs</Text>
      </TouchableOpacity>

      {/* Posts from API */}
      {posts.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fetched Posts:</Text>
          {posts.map((post, index) => (
            <View key={index} style={styles.postItem}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody} numberOfLines={2}>
                {post.body}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#0f0",
  },
  button: {
    backgroundColor: "#0a7ea4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  counter: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0a7ea4",
    textAlign: "center",
    marginBottom: 10,
  },
  postItem: {
    borderLeftWidth: 3,
    borderLeftColor: "#0a7ea4",
    paddingLeft: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  postBody: {
    fontSize: 12,
    color: "#666",
  },
  infoBox: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ffb600",
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: "#856404",
    marginBottom: 5,
  },
});
