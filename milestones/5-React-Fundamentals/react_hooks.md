## Issue 66: Understanding React Hooks: `useEffect`

Use `useEffect` for **side effects** that should happen automatically in response to changes in state or props. On the other hand, use event handlers for **user interactions** that should happen in response to user actions, such as clicks or form submissions. If the logic must happen because the user clicked, use an event handler. If it must happen because the component is visible, use `useEffect`.

If you omit the dependency array entirely, the useEffect will run **after every single render**. This is rarely what you want, as it can lead to massive performance drops or infinite loops if you are updating state inside that same effect.

Improper use of `useEffect` can lead to issues such as:

1. **Infinite Loops**: If you update state inside a `useEffect` without a proper dependency array, it can cause the effect to run indefinitely.

2. **Memory Leaks**: If you set up subscriptions or timers in `useEffect` and forget to clean them up, it can lead to memory leaks.

3. **Unnecessary Re-renders**: Including large objects or arrays in the dependency array without memoization (`useMemo`), causing the effect to fire on every render because the object's memory reference changed.

### Code Snippet for useEffect

[EffectComponent.jsx](https://github.com/pioloebarle/pioloebarle-intern-repo/blob/main/milestones/5-React-Fundamentals/react-project/src/components/EffectComponent.jsx)

### EffectComponent.jsx Output:
![EffectComponent](effectComponent.png)