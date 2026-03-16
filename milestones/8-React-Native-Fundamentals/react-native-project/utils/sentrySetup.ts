import * as Sentry from "@sentry/react-native";
import { log } from "./debugLogger";

const SENTRY_DSN =
  "https://d5bf5401aff727a94730631c2d1c4470@o4511052494012416.ingest.us.sentry.io/4511052858589184";

export const initSentry = () => {
  try {
    Sentry.init({
      dsn: SENTRY_DSN,
      // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing
      tracesSampleRate: 1.0,
      // Set sample rate for error events
      sampleRate: 1.0,
      // Enable debug mode
      debug: __DEV__,
      // Attach stack traces
      attachStacktrace: true,
    });

    log.success("Sentry initialized successfully");
  } catch (error) {
    log.error("Failed to initialize Sentry", error);
  }
};

/**
 * Capture an error in Sentry
 */
export const captureError = (error: Error, context?: Record<string, any>) => {
  try {
    if (context) {
      Sentry.setContext("error_context", context);
    }
    Sentry.captureException(error);
    log.error("Error captured and sent to Sentry", error);
  } catch (err) {
    log.error("Failed to capture error in Sentry", err);
  }
};

/**
 * Capture a message in Sentry
 */
export const captureMessage = (
  message: string,
  level: "fatal" | "error" | "warning" | "info" | "debug" = "info",
) => {
  try {
    Sentry.captureMessage(message, level);
    log.info(`Sentry message captured: ${message}`);
  } catch (error) {
    log.error("Failed to capture message in Sentry", error);
  }
};

/**
 * Add user info to Sentry context
 */
export const setSentryUser = (userId: string, email?: string) => {
  try {
    Sentry.setUser({
      id: userId,
      email: email,
    });
    log.info("Sentry user set", { userId, email });
  } catch (error) {
    log.error("Failed to set Sentry user", error);
  }
};

/**
 * Add breadcrumb (track user action)
 */
export const addBreadcrumb = (message: string, data?: Record<string, any>) => {
  try {
    Sentry.addBreadcrumb({
      message: message,
      data: data,
      level: "info",
    });
  } catch (error) {
    log.error("Failed to add breadcrumb", error);
  }
};

export default Sentry;
