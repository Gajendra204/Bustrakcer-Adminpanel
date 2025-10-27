import { renderHook, act } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthContext";
import { useAuth } from "../useAuth";

describe("useAuth hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should return default unauthenticated state", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  test("should start authenticated if token exists in localStorage", () => {
    localStorage.setItem("adminToken", "mock-token");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  test("login should update state and save token to localStorage", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login("test-token");
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem("adminToken")).toBe("test-token");
  });

  test("logout should update state and remove token from localStorage", () => {
    localStorage.setItem("adminToken", "mock-token");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem("adminToken")).toBeNull();
  });
});
