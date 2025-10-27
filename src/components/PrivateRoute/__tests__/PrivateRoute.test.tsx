import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import { AuthContext } from "../../../context/AuthContext";

describe("PrivateRoute", () => {
  const renderWithAuth = (isAuthenticated: boolean) => {
    return render(
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login: jest.fn(),
          logout: jest.fn(),
        }}
      >
        <MemoryRouter initialEntries={["/private"]}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private Page</div>
                </PrivateRoute>
              }
            />
            <Route path="/auth" element={<div>Auth Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  test("redirects to /auth if not authenticated", () => {
    renderWithAuth(false);

    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });

  test("renders children if authenticated", () => {
    renderWithAuth(true);

    expect(screen.getByText("Private Page")).toBeInTheDocument();
  });
});
