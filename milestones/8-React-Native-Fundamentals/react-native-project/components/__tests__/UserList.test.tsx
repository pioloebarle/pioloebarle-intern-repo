import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import axiosInstance from "../../services/api";
import { UserList } from "../UserList";

// Mock the axios instance
jest.mock("../../services/api");
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("UserList Component", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Shows loading state initially
  it("displays loading indicator while fetching users", () => {
    // Mock API to never resolve (simulate slow loading)
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    expect(screen.getByText("Loading users...")).toBeTruthy();
  });

  // Test 2: Displays users when API call succeeds
  it("displays list of users when data is fetched successfully", async () => {
    // Mock successful API response
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        username: "janesmith",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByTestId("user-list-container")).toBeTruthy();
    });

    // Check if users are displayed
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john@example.com")).toBeTruthy();
    expect(screen.getByText("@johndoe")).toBeTruthy();

    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("jane@example.com")).toBeTruthy();
    expect(screen.getByText("@janesmith")).toBeTruthy();
  });

  // Test 3: Displays error message when API call fails
  it("displays error message when API call fails", async () => {
    // Mock failed API response
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(<UserList />);

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("error-container")).toBeTruthy();
    });

    expect(screen.getByText("Failed to fetch users")).toBeTruthy();
  });

  // Test 4: Displays empty state when no users are returned
  it("displays empty state when API returns empty array", async () => {
    // Mock API returning empty array
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<UserList />);

    // Wait for empty state to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("empty-container")).toBeTruthy();
    });

    expect(screen.getByText("No users found")).toBeTruthy();
  });

  // Test 5: Calls the correct API endpoint
  it("calls the /users endpoint", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("user-list-container")).toBeTruthy();
    });

    // Verify the API was called with correct endpoint
    expect(mockedAxios.get).toHaveBeenCalledWith("/users");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  // Test 6: Renders correct number of user cards
  it("renders the correct number of user cards", async () => {
    const mockUsers = [
      { id: 1, name: "User 1", email: "user1@example.com", username: "user1" },
      { id: 2, name: "User 2", email: "user2@example.com", username: "user2" },
      { id: 3, name: "User 3", email: "user3@example.com", username: "user3" },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("user-list-container")).toBeTruthy();
    });

    // Check if all user cards are rendered
    expect(screen.getByTestId("user-1")).toBeTruthy();
    expect(screen.getByTestId("user-2")).toBeTruthy();
    expect(screen.getByTestId("user-3")).toBeTruthy();
  });
});
