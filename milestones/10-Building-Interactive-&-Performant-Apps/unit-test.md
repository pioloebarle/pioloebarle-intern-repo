## Milestone 10: Building Interactive & Performant Apps

## Issue 69: Introduction to Unit Testing with Jest

Automated testing acts as a safety net. As an app like Focus Bear grows, developers constantly add new features or refactor old code. Without tests, a change in a small utility function might accidentally break the entire Login or Payment flow. Automated tests catch these "regressions" immediately, allowing you to ship code with confidence and saving hours of manual QA.

When writing my first Jest test, I found that the most significant challenge was shifting my perspective to think in terms of "edge cases"; while testing a simple `1 + 1` addition was straightforward, it was much harder to anticipate and account for what might happen if an input was `null`, `undefined`, or an unexpected string.

I also struggled with the initial environment setup, specifically getting the `ESM` and `CommonJS` imports and exports to play nicely between my main application and the test runner.

Finally, adopting a "testing mindset" proved difficult, as I had to learn how to restructure my logic into pure functions without side effects to ensure my code was actually testable.

## Code Snippet on React Native Components

[AdditionCalculator.tsx](https://github.com/pioloebarle/pioloebarle-intern-repo/blob/main/milestones/8-React-Native-Fundamentals/react-native-project/components/AdditionCalculator.tsx)

[AdditionCalculator.test.tsx](https://github.com/pioloebarle/pioloebarle-intern-repo/blob/main/milestones/8-React-Native-Fundamentals/react-native-project/components/__tests__/AdditionCalculator.test.tsx)

### Output for Unit Testing and Integration Testing:

![Unit Testing](addition-calculator.png)

## Issue 70: Testing React Components with Jest & React Testing Library

Using React Testing Library (RTL) is beneficial because it focuses on user-centric testing. If I test implementation details (like the name of a state variable or a private function), my tests will break every time I refactor my code, even if the UI still looks the same to the user. RTL forces me to find elements by their labels, roles, or text—just like a user or a screen reader would—which makes my tests more robust and ensures the app is actually accessible.

One of the main challenges I faced was ensuring the component state correctly transitioned between multiple interactions within a single test. For instance, in my "Reset Name" test, I had to sequentially simulate pressing the "Set Name" button to change the greeting to "Welcome, Piolo Pascual E. Besinga!" and then immediately trigger the "Reset Name" button to verify it returned to "Welcome, Guest!".

I also found it tricky at first to use the correct queries from `screen`; I had to be very precise with the string matching for my full name to ensure `getByText` wouldn't fail due to a typo. Additionally, using `fireEvent.press` required me to first successfully capture the correct button reference, which taught me the importance of having clear, unique text labels in my UI so the test library can find them easily.

## Code Snippet on Welcome Message

**WelcomeMessage.tsx**

```TypeScript
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeMessage() {
  const [name, setName] = useState(false);
  const fullName = "Piolo Pascual E. Besinga";

  return (
    <View>
      <Text style={styles.message}>
        Welcome, {name ? ` ${fullName}!` : "Guest!"}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => setName(true)}
          style={styles.buttonStyle}
        >
          <Text>Set Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setName(false)}
          style={styles.buttonStyle}
        >
          <Text>Reset Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});
```

**WelcomeMessage.test.tsx**

```TypeScript
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import WelcomeMessage from "../WelcomeMessage";

describe("WelcomeMessage Component", () => {
  it("renders the welcome message", () => {
    render(<WelcomeMessage />);

    expect(screen.getByText("Welcome, Guest!")).toBeTruthy();
    expect(screen.getByText("Set Name")).toBeTruthy();
    expect(screen.getByText("Reset Name")).toBeTruthy();
  });

  it('sets the name when "Set Name" button is pressed', () => {
    render(<WelcomeMessage />);
    const setNameButton = screen.getByText("Set Name");

    fireEvent.press(setNameButton);

    expect(screen.getByText("Welcome, Piolo Pascual E. Besinga!")).toBeTruthy();
  });

  it('resets the name when "Reset Name" button is pressed', () => {
    render(<WelcomeMessage />);

    const setNameButton = screen.getByText("Set Name");
    const resetNameButton = screen.getByText("Reset Name");

    fireEvent.press(setNameButton);
    expect(screen.getByText("Welcome, Piolo Pascual E. Besinga!")).toBeTruthy();

    fireEvent.press(resetNameButton);
    expect(screen.getByText("Welcome, Guest!")).toBeTruthy();
  });
});
```

### Output for Unit Testing and Integration Testing:

![Unit Testing](welcome-message.png)

## Issue 71: Mocking API Calls in Jest

Mocking is essential because it makes test **deterministic and fast**. When I write tests that depend on external APIs, I don't want my tests to fail just because the API is down or returns unexpected data. By mocking the API calls, I can control the responses and ensure my tests are reliable and run quickly without making real network requests. This also prevents the test suite from creating "junk data" in a real database during every run.

**Common pitfalls when testing asynchronous code**

1. **Forgeting `await` or `waitFor`**: The most common pitfall is asserting before the promise has resolved, leading to false negatives where the test passes because it didn't find the error yet.
2. **Not Resetting Mocks**: If I mock a return value in one test and don't clear it, it might bleed into the next test, causing unexpected results. Using jest.clearAllMocks() is crucial.
3. **Mocking too much**: If I mock the internal state of the component instead of the API call, I'm no longer testing the component's actual behavior, only my assumptions about it.
4. **Unhandled Promise Rejections**: Forgetting to test the catch block can leave gaps in the code where the app might crash in production if the API fails.

## Code Snippet on Mock API Calls

**PostFetcher.tsx**

```TypeScript
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import axiosInstance from "../services/api";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostFetcher() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    setPost(null);

    try {
      const response = await axiosInstance.get("/posts/1");
      setPost(response.data);
    } catch (err) {
      setError("Error loading post");
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={fetchPost}
        style={styles.button}
        testID="fetch-button"
      >
        <Text style={styles.buttonText}>Fetch Post</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer} testID="loading">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer} testID="error">
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {post && (
        <View style={styles.postContainer} testID="post-content">
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
  },
  postContainer: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  postBody: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
```

**PostFetcher.test.tsx**

```TypeScript
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react-native";
import React from "react";
import axiosInstance from "../../services/api";
import PostFetcher from "../PostFetcher";

// Mock the entire API module
jest.mock("../../services/api");
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("PostFetcher Component - API Mocking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders the fetch button initially
  it("renders the fetch button initially", () => {
    render(<PostFetcher />);

    expect(screen.getByTestId("fetch-button")).toBeTruthy();
    expect(screen.getByText("Fetch Post")).toBeTruthy();
  });

  // Test 2: Shows loading state while fetching
  it("displays loading indicator when fetching post", () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    render(<PostFetcher />);
    const fetchButton = screen.getByTestId("fetch-button");

    fireEvent.press(fetchButton);

    expect(screen.getByTestId("loading")).toBeTruthy();
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  // Test 3: Displays post when API call succeeds
  it("displays post data when API call is successful", async () => {
    const mockPost = {
      id: 1,
      title: "Test Post Title",
      body: "This is the test post body content",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

    render(<PostFetcher />);
    const fetchButton = screen.getByTestId("fetch-button");

    fireEvent.press(fetchButton);

    await waitFor(() => {
      expect(screen.getByTestId("post-content")).toBeTruthy();
    });

    expect(screen.getByText("Test Post Title")).toBeTruthy();
    expect(screen.getByText("This is the test post body content")).toBeTruthy();
  });

  // Test 4: Displays error message when API call fails
  it("displays error message when API call fails", async () => {
    render(<PostFetcher />);
    const fetchButton = screen.getByTestId("fetch-button");

    fireEvent.press(fetchButton);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeTruthy();
    });

    expect(screen.getByText("Error loading post")).toBeTruthy();
  });

  // Test 5: Calls the correct API endpoint
  it("calls the correct API endpoint", async () => {
    const mockPost = { id: 1, title: "Post", body: "Content" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

    render(<PostFetcher />);
    const fetchButton = screen.getByTestId("fetch-button");

    fireEvent.press(fetchButton);

    await waitFor(() => {
      expect(screen.getByTestId("post-content")).toBeTruthy();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith("/posts/1");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  // Test 6: Allows multiple fetch operations
  it("allows multiple fetch operations", async () => {
    const mockPost1 = { id: 1, title: "First Post", body: "First content" };
    const mockPost2 = { id: 1, title: "Second Post", body: "Second content" };

    mockedAxios.get.mockResolvedValueOnce({ data: mockPost1 });

    render(<PostFetcher />);
    const fetchButton = screen.getByTestId("fetch-button");

    fireEvent.press(fetchButton);

    await waitFor(() => {
      expect(screen.getByText("First Post")).toBeTruthy();
    });

    mockedAxios.get.mockResolvedValueOnce({ data: mockPost2 });
    fireEvent.press(fetchButton);

    await waitFor(() => {
      expect(screen.getByText("Second Post")).toBeTruthy();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
```

### Output for Unit Testing on Mock API Calls:

![Mock API Calls](mock-api-calls.png)