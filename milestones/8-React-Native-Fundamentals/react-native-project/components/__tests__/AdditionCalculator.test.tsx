import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import Addition from "../AdditionCalculator";

describe("Addition Calculator Component", () => {
  it("renders the input fields and buttons", () => {
    render(<Addition />);

    expect(screen.getByPlaceholderText("First Number")).toBeTruthy();
    expect(screen.getByPlaceholderText("Second Number")).toBeTruthy();
    expect(screen.getByText("Add (+)")).toBeTruthy();
  });

  it("calculates the sum correctly", () => {
    render(<Addition />);

    const firstInput = screen.getByPlaceholderText("First Number");
    const secondInput = screen.getByPlaceholderText("Second Number");
    const addButton = screen.getByText("Add (+)");

    fireEvent.changeText(firstInput, "5");
    fireEvent.changeText(secondInput, "10");

    fireEvent.press(addButton);

    expect(screen.getByText("Sum: 15")).toBeTruthy();
  });

  it("calculates the sum correctly with decimal numbers", () => {
    render(<Addition />);

    const firstInput = screen.getByPlaceholderText("First Number");
    const secondInput = screen.getByPlaceholderText("Second Number");
    const addButton = screen.getByText("Add (+)");

    fireEvent.changeText(firstInput, "5.5");
    fireEvent.changeText(secondInput, "10.2");

    fireEvent.press(addButton);

    expect(screen.getByText("Sum: 15.7")).toBeTruthy();
  });

  it("calculates the sum correctly with negative numbers", () => {
    render(<Addition />);

    const firstInput = screen.getByPlaceholderText("First Number");
    const secondInput = screen.getByPlaceholderText("Second Number");
    const addButton = screen.getByText("Add (+)");

    fireEvent.changeText(firstInput, "-10");
    fireEvent.changeText(secondInput, "7");

    fireEvent.press(addButton);

    expect(screen.getByText("Sum: -3")).toBeTruthy();
  });

  it("does not show result for invalid input", () => {
    render(<Addition />);

    const firstInput = screen.getByPlaceholderText("First Number");
    const secondInput = screen.getByPlaceholderText("Second Number");
    const addButton = screen.getByText("Add (+)");

    fireEvent.changeText(firstInput, "abc");
    fireEvent.changeText(secondInput, "10.2");

    fireEvent.press(addButton);

    expect(screen.queryByText(/Sum:/)).toBeNull();
  });
});
