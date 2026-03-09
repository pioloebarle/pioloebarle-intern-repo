import { createPost } from "@/services/userService";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ApiTestScreen() {
  const [userId, setUserId] = useState("1");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Test POST create
  const handleCreatePost = async () => {
    try {
      setLoading(true);
      setResult("");
      const newPost = await createPost({
        userId: Number(userId),
        title: postTitle || "Test Post",
        body: postBody || "This is a test post",
      });
      setResult(JSON.stringify(newPost, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>API Testing with Axios</Text>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Post Title:</Text>
        <TextInput
          style={styles.input}
          value={postTitle}
          onChangeText={setPostTitle}
          placeholder="Enter post title"
        />

        <Text style={styles.label}>Post Body:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={postBody}
          onChangeText={setPostBody}
          placeholder="Enter post body"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.button, styles.postButton]}
          onPress={handleCreatePost}
        >
          <Text style={styles.buttonText}>POST</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Result Section */}
      {result && !loading && (
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>Response:</Text>
          <ScrollView style={styles.resultScroll} nestedScrollEnabled>
            <Text style={styles.resultText}>{result}</Text>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputSection: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonSection: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  resultSection: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  resultScroll: {
    maxHeight: 400,
  },
  resultText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "monospace",
  },
});
