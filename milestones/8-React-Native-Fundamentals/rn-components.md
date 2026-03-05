# Milestone 8: React Native Fundamentals

## Issue 29: Understanding React Native Components vs. React Components

While both `<View>` and `<div>` acts as containers, `<View>` is mapped directly to the native platform's view component. Unlike `<div>`, which can hold raw text, a `<View>` cannot contain text directly, all text in React Native must be wrapped in a `<Text>` component. Additionally, `<View>` uses Flexbox by default with a column orientation, whereas a `<div>` defaults to block display.

`StyleSheet.create()` sends the style object through the "bridge" to the native side only once. It assigns an ID to that style, and from then on, only the ID is passed during re-renders. Inline styles however, create a new object on every render, which increases memory usage and forces the bridge to process the entire object repeatedly.

`className` is a concept belonging to the browser's CSS engine. Since React Native does not use a browser or traditional CSS files, there is no engine to parse classes. Instead, it uses an "Object-based" styling system (JSS) that maps JavaScript properties directly to native layout parameters. While libraries like **NativeWind** allow us to use Tailwind classes, they act as a compiler that translates those strings into standard JavaScript style objects before the code reaches the mobile device.

Alternatively, you can use `StyleSheet.create()` and **NativeWind** together. You can follow the documentation of NativeWind to learn how to use it.

Source: [NativeWind Documentation Installation Guide](https://www.nativewind.dev/docs/getting-started/installation)

### Code Snippet on React Native Components

[index.tsx](https://github.com/pioloebarle/pioloebarle-intern-repo/blob/main/milestones/8-React-Native-Fundamentals/react-native-project/app/(tabs)/index.tsx)

### Output of React Native Components:

![React Native Components](rnComponents.jpg)