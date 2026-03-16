import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { log } from "../utils/debugLogger";
import {
    addBreadcrumb,
    captureError,
    captureMessage,
} from "../utils/sentrySetup";

export default function ErrorSimulator() {
  const [lastError, setLastError] = useState<string>("No errors yet");
  const [errorCount, setErrorCount] = useState(0);

  /**
   * Test 1: Throw a regular JavaScript error
   */
  const throwJavaScriptError = () => {
    try {
      addBreadcrumb("User triggered JavaScript error test");
      throw new Error("This is a test JavaScript error from Error Simulator");
    } catch (error) {
      setLastError("JavaScript Error thrown");
      setErrorCount((prev) => prev + 1);
      captureError(error as Error, { errorType: "javascript" });
    }
  };

  /**
   * Test 2: Null reference error
   */
  const throwNullReferenceError = () => {
    try {
      addBreadcrumb("User triggered null reference error test");
      const obj: any = null;
      obj.someProperty.someMethod(); // Will throw error
    } catch (error) {
      setLastError("Null Reference Error thrown");
      setErrorCount((prev) => prev + 1);
      captureError(error as Error, { errorType: "null_reference" });
    }
  };

  /**
   * Test 3: Type error
   */
  const throwTypeError = () => {
    try {
      addBreadcrumb("User triggered type error test");
      const number: any = "hello";
      number.toFixed(2); // String has no toFixed method
    } catch (error) {
      setLastError("Type Error thrown");
      setErrorCount((prev) => prev + 1);
      captureError(error as Error, { errorType: "type_error" });
    }
  };

  /**
   * Test 4: Division by zero (calculation error)
   */
  const throwCalculationError = () => {
    try {
      addBreadcrumb("User triggered calculation error test");
      const result = 10 / 0;
      if (!isFinite(result)) {
        throw new Error("Division by zero: Result is infinity");
      }
    } catch (error) {
      setLastError("Calculation Error thrown");
      setErrorCount((prev) => prev + 1);
      captureError(error as Error, { errorType: "calculation" });
    }
  };

  /**
   * Test 5: Custom error with message
   */
  const throwCustomError = () => {
    try {
      addBreadcrumb("User triggered custom error test");
      throw new Error(
        "Custom error: Data validation failed - Invalid email format",
      );
    } catch (error) {
      setLastError("Custom Error thrown");
      setErrorCount((prev) => prev + 1);
      captureError(error as Error, {
        errorType: "custom",
        module: "validation",
      });
    }
  };

  /**
   * Test 6: Send message to Sentry (not an error)
   */
  const sendWarningMessage = () => {
    addBreadcrumb("User triggered warning message test");
    captureMessage(
      "This is a test warning message - Check your data!",
      "warning",
    );
    setLastError("Warning message sent to Sentry");
    setErrorCount((prev) => prev + 1);
  };

  /**
   * Test 7: Simulate network error
   */
  const simulateNetworkError = () => {
    try {
      addBreadcrumb("User triggered network error simulation");
      throw new Error(
        "Network Error: Failed to connect to API - Connection timeout",
      );
    } catch (error) {
      setLastError("Network Error thrown");
      setErrorCount((prev) => prev + 1);
      captureError(error as Error, {
        errorType: "network",
        endpoint: "/api/users",
      });
    }
  };

  /**
   * Clear error state
   */
  const clearErrors = () => {
    setLastError("Errors cleared");
    setErrorCount(0);
    addBreadcrumb("User cleared error history");
    log.info("Error history cleared");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Error Simulator</Text>

      {/* Error Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Last Error:</Text>
        <Text style={styles.statusText}>{lastError}</Text>
        <Text style={styles.statusLabel}>Total Errors:</Text>
        <Text style={styles.errorCount}>{errorCount}</Text>
      </View>

      {/* Error Test Buttons */}
      <Text style={styles.sectionTitle}>Test Errors:</Text>

      <TouchableOpacity style={styles.button} onPress={throwJavaScriptError}>
        <Text style={styles.buttonText}>1. Throw JavaScript Error</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={throwNullReferenceError}>
        <Text style={styles.buttonText}>2. Null Reference Error</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={throwTypeError}>
        <Text style={styles.buttonText}>3. Type Error</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={throwCalculationError}>
        <Text style={styles.buttonText}>4. Calculation Error</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={throwCustomError}>
        <Text style={styles.buttonText}>5. Custom Error</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={simulateNetworkError}>
        <Text style={styles.buttonText}>6. Network Error</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.warningButton]}
        onPress={sendWarningMessage}
      >
        <Text style={styles.buttonText}>7. Send Warning Message</Text>
      </TouchableOpacity>

      {/* Clear Button */}
      <TouchableOpacity style={styles.clearButton} onPress={clearErrors}>
        <Text style={styles.buttonText}>Clear History</Text>
      </TouchableOpacity>
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
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "600",
    marginBottom: 8,
  },
  errorCount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  infoBox: {
    backgroundColor: "#e8f4f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#2c3e50",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  warningButton: {
    backgroundColor: "#f39c12",
  },
  clearButton: {
    backgroundColor: "#95a5a6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },
  instructionsBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },
  instructionsTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 12,
    color: "#27ae60",
    lineHeight: 18,
  },
  sentryInfoBox: {
    backgroundColor: "#f4ecf7",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: "#9b59b6",
  },
  sentryInfoTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#8e44ad",
    marginBottom: 8,
  },
  sentryInfoText: {
    fontSize: 12,
    color: "#8e44ad",
    marginBottom: 4,
  },
});
