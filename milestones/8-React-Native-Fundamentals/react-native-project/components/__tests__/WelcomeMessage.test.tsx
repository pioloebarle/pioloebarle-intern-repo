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
