# Milestone 12: Focus on Bear-Specific Libraries

## Issue 21: Using Native Modules and Bridging in React Native

You need them whenever you require a feature that the standard React Native API doesn't provide yet. For Focus Bear, this includes deep system integrations like Background Tasks (to keep the timer running), Screen Time APIs, or System-level notifications that need to bypass the JS thread's limitations.

React Native communicates through the Native Bridge. When a JS function is called, it serializes the arguments into a JSON message and sends it across the bridge. The Native side receives the message, executes the code (like Java or Swift), and sends a callback or promise back across the bridge to the JS side. This allows for powerful integrations but introduces latency (because of the serialization and asynchronous nature) and complexity (because you have to manage two codebases).

The primary challenge is **Code Duplication**; you have to write the same feature twice (once in Kotlin for Android and once in Swift for iOS). Additionally, whenever the React Native version is upgraded, the native bridge code might break, requiring manual updates in Android Studio and Xcode. Debugging can also be tricky because you have to switch between JS and native code, and errors might not always propagate clearly across the bridge.