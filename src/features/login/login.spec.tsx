import "@testing-library/jest-dom";
import { LoginPage } from ".";
import { renderWithProviders } from "@/store/test-provider";
import { fireEvent, waitFor } from "@testing-library/react";
import * as server from "@/server";

describe("LoginPage", () => {
  test("should render the login page", () => {
    const { getByTestId } = renderWithProviders(<LoginPage />);
    const user = getByTestId("user-field");
    const password = getByTestId("password-field");
    const button = getByTestId("submit-button");

    expect(user).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test("shows error on login with invalid credentials", async () => {
    jest.spyOn(server, "_getUsers").mockResolvedValue({
      tylermcginnis: { password: "abc321" },
    } as any);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { getByTestId } = renderWithProviders(<LoginPage />);
    const userField = getByTestId("user-field");
    const passwordField = getByTestId("password-field");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(userField, { target: { value: "wronguser" } });
    fireEvent.change(passwordField, { target: { value: "wrongpass" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("User not found");
    });

    alertSpy.mockRestore();
  });
  test("login button should be disabled with any empty field", () => {
    const { getByTestId } = renderWithProviders(<LoginPage />);
    const user = getByTestId("user-field");
    const password = getByTestId("password-field");
    const button = getByTestId("submit-button");

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    fireEvent.change(user, { target: { value: "tylermcginnis" } });
    expect(button).toBeDisabled();

    fireEvent.change(password, { target: { value: "wrongpass" } });
    expect(button).toBeEnabled();
  });
});
