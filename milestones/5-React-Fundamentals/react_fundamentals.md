# Milestone 5: React Fundamentals

## Issue 59: Setting up a React Project

I did not face any challenges while setting up the React Project with TailWind CSS. I followed some tutorials on how to set up a React project with Tailwind CSS in YouTube. The video was very helpful and informative and I was able to set up the project without any issues. Another thing is I have experience in creating a React Project in my academic years so it helped me alot aside from the Youtube Tutorial.

**Youtube Video:**
[How to Create a React App with Tailwind CSS v4 | Full Project & Setup Tutorial (2025)](https://www.youtube.com/watch?v=8ffYlFxxBpc)

## Issue 60: Understanding Components & Props

Components are very important in React because they allow us to break down our UI into smaller, reusable pieces. This makes our code more organized and easier to maintain. Components also help us to manage the state of our application and to create dynamic user interfaces.

## Issue 61: Understanding Components & Props

If you modify state directly, React will not reflect the changes in the UI because it does not know that the state has changed. When you use the function like `setCount`, React is able to track the changes, re-render the component and update the changes in the UI accordingly. If you bypass this by changing the variable manually, the data changes in the background but the user still see the old value on the screen.

## Issue 62: Working with Lists & User Input

The common issues with Lists in React are:

1. **Key Prop**: When rendering lists, React requires a unique `key` prop for each item. If you forget to provide a key or use an index as a key, it can lead to performance issues and bugs when the list changes.

2. **Mutating State Directly**: React expects state to be immutable. If you directly mutate an array or object in state, React won't detect the change and won't re-render the component. Always use methods like `setState` or `useState` to update state immutably.

3. **Unexpected "Stale" State Issues**: When mapping through a list to create buttons, the closure inside the `.map()` function might capture an old version of the state if not handled correctly. To fix this, you can use a functional update to ensure you're working with the latest state such as `setList(prevList => ...)`.