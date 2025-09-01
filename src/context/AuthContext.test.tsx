import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext, AuthProvider } from "./AuthContext";

const TestComponent = () => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  return (
    <div>
      <p data-testid="status">
        {auth.isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </p>
      <button onClick={() => auth.login("test-token")}>Login</button>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should start unauthenticated when no token is in localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status")).toHaveTextContent("Not Authenticated");
  });

  test("should start authenticated if token exists in localStorage", () => {
    localStorage.setItem("adminToken", "mock-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status")).toHaveTextContent("Authenticated");
  });

  test("login should update state and save token to localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByTestId("status")).toHaveTextContent("Authenticated");
    expect(localStorage.getItem("adminToken")).toBe("test-token");
  });

  test("logout should clear state and remove token from localStorage", () => {
    localStorage.setItem("adminToken", "mock-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("status")).toHaveTextContent("Not Authenticated");
    expect(localStorage.getItem("adminToken")).toBeNull();
  });
});
