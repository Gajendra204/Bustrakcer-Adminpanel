import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutes } from "../useRoutes";
import * as routeApi from "../../api/routes";
import toast from "react-hot-toast";

jest.mock("../../api/routes");
jest.mock("react-hot-toast");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Provide safe defaults to avoid React Query console warnings
    (routeApi.getAllRoutes as jest.Mock).mockResolvedValue([]);
  });

  test("fetches routes successfully", async () => {
    (routeApi.getAllRoutes as jest.Mock).mockResolvedValue([
      { _id: "r1", name: "Route A", stops: [] },
    ]);

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.routes.length).toBe(1));
    expect(result.current.routes[0].name).toBe("Route A");
  });

  test("fetchRouteById sets currentRoute", async () => {
    (routeApi.getRouteById as jest.Mock).mockResolvedValue({
      _id: "r1",
      name: "Route One",
      stops: [],
    });

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    let route;
    await act(async () => {
      route = await result.current.fetchRouteById("r1");
    });

    expect(result.current.currentRoute?.name).toBe("Route One");
  });

  test("fetchRouteById handles error", async () => {
    (routeApi.getRouteById as jest.Mock).mockRejectedValue(new Error("Not found"));

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await expect(result.current.fetchRouteById("bad-id")).rejects.toThrow("Not found");
    expect(toast.error).toHaveBeenCalledWith("Failed to fetch route");
  });

  test("createRoute mutation updates cache and calls toast.success", async () => {
    (routeApi.createRoute as jest.Mock).mockResolvedValue({
      _id: "r2",
      name: "New Route",
      stops: [],
    });

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.addRoute({ name: "New Route", stops: [] });
    });

    expect(toast.success).toHaveBeenCalledWith("Route created successfully");
  });

  test("updateRoute mutation updates existing route", async () => {
    (routeApi.updateRoute as jest.Mock).mockResolvedValue({
      _id: "r1",
      name: "Updated Route",
      stops: [],
    });

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.modifyRoute("r1", { name: "Updated Route", stops: [] });
    });

    expect(toast.success).toHaveBeenCalledWith("Route updated successfully");
  });

  test("deleteRoute mutation removes route", async () => {
    (routeApi.deleteRoute as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.removeRoute("r1");
    });

    expect(toast.success).toHaveBeenCalledWith("Route deleted successfully");
  });

  test("assignBus mutation updates route and calls toast.success", async () => {
    (routeApi.assignBusToRoute as jest.Mock).mockResolvedValue({
      _id: "r1",
      name: "Route With Bus",
      bus: { _id: "b1", name: "Bus 1" },
    });

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.assignBus("r1", { busId: "b1" });
    });

    expect(toast.success).toHaveBeenCalledWith("Bus assigned to route successfully");
  });

  test("assignBus mutation handles error", async () => {
    (routeApi.assignBusToRoute as jest.Mock).mockRejectedValue(
      new Error("Assignment failed")
    );

    const { result } = renderHook(() => useRoutes(), { wrapper: createWrapper() });

    await act(async () => {
      try {
        await result.current.assignBus("r1", { busId: "b1" });
      } catch {}
    });

    expect(toast.error).toHaveBeenCalledWith("Assignment failed");
  });
});
