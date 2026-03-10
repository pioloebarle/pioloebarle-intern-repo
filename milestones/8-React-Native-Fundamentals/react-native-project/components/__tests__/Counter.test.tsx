import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Counter } from "../Counter";

/**
 * Unit Tests for Counter Component
 *
 * These tests demonstrate:
 * - Rendering components
 * - Finding elements by testID
 * - Simulating user interactions (button presses)
 * - Asserting expected behavior
 */

describe("Counter Component", () => {
  // Test 1: Component renders correctly
  it("renders the counter with initial count of 0", () => {
    render(<Counter />);

    // Check if title is displayed
    expect(screen.getByText("Counter App")).toBeTruthy();

    // Check if count starts at 0
    expect(screen.getByText("Count: 0")).toBeTruthy();
  });

  // Test 2: Increment button works
  it("increments count when + button is pressed", () => {
    render(<Counter />);

    const incrementButton = screen.getByTestId("increment-button");

    // Press the button once
    fireEvent.press(incrementButton);
    expect(screen.getByText("Count: 1")).toBeTruthy();

    // Press again
    fireEvent.press(incrementButton);
    expect(screen.getByText("Count: 2")).toBeTruthy();
  });

  // Test 3: Decrement button works
  it("decrements count when - button is pressed", () => {
    render(<Counter />);

    const decrementButton = screen.getByTestId("decrement-button");

    // Press the button once
    fireEvent.press(decrementButton);
    expect(screen.getByText("Count: -1")).toBeTruthy();

    // Press again
    fireEvent.press(decrementButton);
    expect(screen.getByText("Count: -2")).toBeTruthy();
  });

  // Test 4: Reset button works
  it("resets count to 0 when reset button is pressed", () => {
    render(<Counter />);

    const incrementButton = screen.getByTestId("increment-button");
    const resetButton = screen.getByTestId("reset-button");

    // Increment a few times
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    expect(screen.getByText("Count: 3")).toBeTruthy();

    // Press reset
    fireEvent.press(resetButton);
    expect(screen.getByText("Count: 0")).toBeTruthy();
  });

  // Test 5: Multiple operations
  it("handles multiple increment and decrement operations", () => {
    render(<Counter />);

    const incrementButton = screen.getByTestId("increment-button");
    const decrementButton = screen.getByTestId("decrement-button");

    // +3
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);

    // -1
    fireEvent.press(decrementButton);

    expect(screen.getByText("Count: 2")).toBeTruthy();
  });

  // Test 6: Check if all buttons are rendered
  it("renders all three buttons", () => {
    render(<Counter />);

    expect(screen.getByTestId("increment-button")).toBeTruthy();
    expect(screen.getByTestId("decrement-button")).toBeTruthy();
    expect(screen.getByTestId("reset-button")).toBeTruthy();
  });
});
