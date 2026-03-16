# Milestone 12: Focus Bear Specific Libraries

## Issue 17: Understanding Key Libraries Used in Focus Bear

## Libraries and its purpose

1. **Redux Persist** (`redux-persist`): In a standard Redux setup, the state resets when the app is closed. Redux Persist solves this by saving the Redux state to persistent storage (like AsyncStorage on React Native) and rehydrating it when the app restarts. This ensures that user preferences, authentication tokens, and other critical state data are preserved across sessions, providing a seamless user experience.
2. **Sentry** (`@sentry/react-native`): This is the app's "Black Box" flight recorder. It captures unhandled exceptions, crashes, and performance issues in production. Sentry provides detailed stack traces, user context, and breadcrumbs leading up to the error, which helps developers quickly identify and fix issues that users encounter in the wild. If a user in Australia experiences a crash, Sentry captures the stack trace, device model, and OS version, and sends it to the developers. It allows the team to fix bugs they can't reproduce on their own machines.
3. React Native Reanimated (`react-native-reanimated`): This library provides a more powerful and flexible way to create animations in React Native. It runs animations on the UI thread, which allows for smoother and more performant animations compared to the standard Animated API. In Focus Bear, it's used for complex interactions like the swipe-to-dismiss feature on tasks, where smooth and responsive animations are crucial for a good user experience.

## Unfamiliar Library

`@pusher/pusher-websocket-react-native`

Normal APIs (like Axios) uses a "Pull" system: the app asks the server for data. **Pusher** uses a "Push" system via **WebSockets**. It maintains an open connection between the server and the phone.

When something happens on the server (like a new task being assigned), the server "pushes" that update to the app in real-time. This allows for instant updates without the need for the app to constantly check for changes, which is more efficient and provides a better user experience.

## Reflection

Redux-Persist saves the global state to permanent storage. It's useful because it prevents the "Session Reset" frustration; users stay logged in and their current task remains active even after a reboot.

A normal timer stops if the app is minimized or the phone goes to sleep. With `react-native-background-fetch`, the app can wake up periodically to check if the timer should still be running, ensuring that the timer continues to work even when the app isn't in the foreground.

Focus Bear uses `react-native-auth0` because manual authentication is prone to malicious attacks and is complex to implement securely. Auth0 is a "Security-as-a-Service" that ensures industry-standard-protection and easy integration with Apply/Google login.

`posthog-react-native` is for **product analytics**. It helps the team understand how users are interacting with the app, which features are popular, and where users might be dropping off. This data is crucial for making informed decisions about future development and improving the user experience.

**Sentry** is for engineers to fix crashes (Negative events). **PostHog** is for product managers to understand usage patterns (Positive/Neutral events). You use Sentry when the app breaks; you use PostHog to see if the app is "useful."

`react-native-localize` acts as a sensor to detect the phone's language (e.g., "en-AU"). It passes this code to `i18next`, which then looks up the corresponding translated string from a JSON file. This allows Focus Bear to display text in the user's preferred language, enhancing accessibility and user experience for a global audience.

If given the chance, I would consider replacing axios with React Query (TanStack Query). While Axios is great for fetching, React Query handles the caching and server state logic automatically, which could significantly reduce the amount of manual Redux code needed for API data. It also provides built-in support for features like pagination, background refetching, and optimistic updates, which would enhance the responsiveness and interactivity of the app without much additional code.
