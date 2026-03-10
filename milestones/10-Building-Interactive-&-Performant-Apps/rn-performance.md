# Milestone 10: Building Interactive & Performant Apps

## Issue 24: Performance Optimization in React Native

The most common issues include **unnecessary re-renders** (often caused by anonymous functions passed as props), **large list rendering** without `FlatList` optimizations, and heavy computation on the JS thread. Another major issue is image memory bloat, where high-resolution images are loaded into memory without being resized, causing the app to crash on older devices.

`useMemo` improves performance by caching the result of a calculation, so it isn't repeated unless its inputs change. `useCallback` caches the function definition itself, ensuring that a child component (wrapped in `React.memo`) doesn't re-render simply because a parent re-rendered and created a "new" function in memory. Both reduce the workload on the JavaScript thread and minimize Bridge traffic.

Tools that can measure and monitor app performance:
* **React DevTools Profiler**: Visualizes which components are rendering and why.
* **Performance Monitor (built-in)**: Shows the current FPS for both the JS and UI threads (access via the Shake menu).
* **Flipper**: A powerful desktop app that lets you inspect network traffic, layout, and even database performance.
* **FlashList (by Shopify)**: A high-performance replacement for FlatList that recycles views to save memory.

## Code Snippet on React Native Components

[performance.tsx](https://github.com/pioloebarle/pioloebarle-intern-repo/blob/main/milestones/8-React-Native-Fundamentals/react-native-project/app/(tabs)/home/performance.tsx)

[PerformanceDemo.tsx](https://github.com/pioloebarle/pioloebarle-intern-repo/blob/main/milestones/8-React-Native-Fundamentals/react-native-project/components/PerformanceDemo.tsx)

### Output for Performance Optimization:

![Performance Optimization](performance-output.png)