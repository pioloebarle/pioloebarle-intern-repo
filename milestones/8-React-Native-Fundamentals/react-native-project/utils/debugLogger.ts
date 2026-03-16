/**
 * Simple Debug Logger
 * Logs to terminal output (visible in "npx expo start" output)
 * Does NOT require Flipper - uses console directly
 */

const timestamp = () => new Date().toLocaleTimeString();

export const log = {
  // Info level - general information
  info: (message: string, data?: any) => {
    console.log(`[${timestamp()}] ℹ️  INFO: ${message}`, data || "");
  },

  // Warning level - warnings
  warn: (message: string, data?: any) => {
    console.warn(`[${timestamp()}] ⚠️  WARN: ${message}`, data || "");
  },

  // Error level - errors
  error: (message: string, data?: any) => {
    console.error(`[${timestamp()}] ❌ ERROR: ${message}`, data || "");
  },

  // Debug level - detailed debugging
  debug: (message: string, data?: any) => {
    console.log(`[${timestamp()}] 🔍 DEBUG: ${message}`, data || "");
  },

  // Success level - successful operations
  success: (message: string, data?: any) => {
    console.log(`[${timestamp()}] ✅ SUCCESS: ${message}`, data || "");
  },

  // Network level - API calls
  network: (method: string, endpoint: string, status?: number) => {
    const statusIcon = status && status >= 200 && status < 300 ? "✓" : "✗";
    console.log(
      `[${timestamp()}] 🌐 NETWORK: ${statusIcon} ${method} ${endpoint} ${status || ""}`,
    );
  },
};

export default log;
