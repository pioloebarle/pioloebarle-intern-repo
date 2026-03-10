# React Native Testing Guide

## 📚 What We Built

This guide covers unit testing in React Native from scratch. You now have:

1. ✅ **Testing libraries installed** (Jest + React Native Testing Library)
2. ✅ **A simple component** (Counter) with unit tests
3. ✅ **A component with API calls** (UserList) with mocked API tests

---

## 🧪 Types of Testing (Simple Explanation)

### 1. **Unit Testing** ⚡ (What we did here)

- Tests individual components in isolation
- Fast and easy to write
- Example: Testing if a button works

### 2. **Integration Testing** 🔗

- Tests how multiple components work together
- Medium complexity
- Example: Testing if form data reaches the API

### 3. **End-to-End (E2E) Testing** 🎯

- Tests the entire app like a real user
- Slower but most comprehensive
- Example: Testing login → navigation → checkout flow

---

## 🚀 How to Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-reruns when files change)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run a specific test file
npm test Counter.test
```

---

## 📁 What Was Created

### Configuration Files

- **`jest.config.js`** - Jest configuration for React Native
- **`jest.setup.js`** - Setup file with mocks for Expo and AsyncStorage
- **`package.json`** - Added test script and dependencies

### Components

- **`components/Counter.tsx`** - Simple counter component for learning
- **`components/UserList.tsx`** - Component that fetches users from API

### Test Files

- **`components/__tests__/Counter.test.tsx`** - Unit tests for Counter
- **`components/__tests__/UserList.test.tsx`** - Tests with mocked API

---

## 📖 Understanding the Counter Tests

### What the Counter component does:

- Shows a number (count)
- Has buttons to: increment (+), decrement (-), and reset

### What we test:

```typescript
// 1. Does it render correctly?
it('renders the counter with initial count of 0', () => { ... });

// 2. Does increment button work?
it('increments count when + button is pressed', () => { ... });

// 3. Does decrement button work?
it('decrements count when - button is pressed', () => { ... });

// 4. Does reset button work?
it('resets count to 0 when reset button is pressed', () => { ... });
```

### Key Testing Concepts:

- **`render()`** - Renders the component for testing
- **`screen.getByTestId()`** - Finds elements by testID prop
- **`fireEvent.press()`** - Simulates button presses
- **`expect().toBeTruthy()`** - Checks if something exists

---

## 📖 Understanding the UserList Tests (with Mocked API)

### What the UserList component does:

- Fetches users from an API
- Shows loading spinner while fetching
- Displays users or error message

### What we test:

```typescript
// 1. Shows loading state
it('displays loading indicator while fetching users', () => { ... });

// 2. Shows users when API succeeds
it('displays list of users when data is fetched successfully', async () => { ... });

// 3. Shows error when API fails
it('displays error message when API call fails', async () => { ... });

// 4. Shows empty state
it('displays empty state when API returns empty array', async () => { ... });
```

### Key Mocking Concepts:

- **`jest.mock()`** - Mocks an entire module (like the API)
- **`mockResolvedValueOnce()`** - Mocks successful API response
- **`mockRejectedValueOnce()`** - Mocks failed API response
- **`waitFor()`** - Waits for async operations to complete

---

## 🎯 Quick Testing Cheat Sheet

### Basic Test Structure

```typescript
describe('Component Name', () => {
  it('should do something', () => {
    // 1. Render the component
    render(<MyComponent />);

    // 2. Find elements
    const button = screen.getByTestId('my-button');

    // 3. Interact with elements
    fireEvent.press(button);

    // 4. Assert expected behavior
    expect(screen.getByText('Success')).toBeTruthy();
  });
});
```

### Finding Elements

```typescript
// By testID (recommended)
screen.getByTestId("my-element");

// By text
screen.getByText("Hello World");

// By placeholder
screen.getByPlaceholderText("Enter name");
```

### Simulating User Actions

```typescript
// Press a button
fireEvent.press(button);

// Type text
fireEvent.changeText(input, "Hello");

// Change value
fireEvent(input, "onChange", { target: { value: "test" } });
```

### Mocking API Calls

```typescript
// Mock the module
jest.mock("../services/api");

// Mock successful response
mockedApi.get.mockResolvedValueOnce({ data: mockData });

// Mock error response
mockedApi.get.mockRejectedValueOnce(new Error("Failed"));

// Wait for async operations
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeTruthy();
});
```

---

## ✨ Best Practices

1. **Use testID for elements** - Makes tests more reliable

   ```tsx
   <Button testID="submit-button">Submit</Button>
   ```

2. **Test user behavior, not implementation** - Test what users see and do

3. **Keep tests simple** - One test should test one thing

4. **Mock external dependencies** - APIs, navigation, async storage

5. **Use descriptive test names** - Should explain what is being tested

---

## 🔧 Troubleshooting

### Tests fail with "Cannot find module"

- Make sure all dependencies are installed: `npm install`

### Tests timeout

- Increase timeout in jest.config.js or use `waitFor` with longer timeout

### Mock not working

- Check that the mock path matches the import path exactly
- Call `jest.clearAllMocks()` in `beforeEach()`

---

## 📚 Next Steps

1. **Practice**: Write tests for your existing components
2. **Coverage**: Run `npm test -- --coverage` to see what's not tested
3. **Learn more**: Check out [React Native Testing Library docs](https://callstack.github.io/react-native-testing-library/)

---

## 🎓 Summary

You now know how to:

- ✅ Set up Jest and Testing Library
- ✅ Write unit tests for React Native components
- ✅ Mock API requests in tests
- ✅ Test loading, success, and error states
- ✅ Use `render`, `fireEvent`, `screen`, and `waitFor`

Happy Testing! 🎉
