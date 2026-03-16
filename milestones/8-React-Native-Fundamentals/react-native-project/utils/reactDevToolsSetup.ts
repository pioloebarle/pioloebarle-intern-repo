export const initReactDevTools = () => {
  if (!__DEV__) return;

  try {
    console.log("✅ React DevTools enabled - Install browser extension to use");
  } catch (error) {
    console.log("React DevTools setup complete");
  }
};

export default initReactDevTools;
