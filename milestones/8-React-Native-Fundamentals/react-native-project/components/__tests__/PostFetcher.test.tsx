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
    // Mock failed API response
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

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
