import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBuses } from "../useBuses";
import * as busApi from "../../api/buses";
import * as driverApi from "../../api/drivers";
import toast from "react-hot-toast";

jest.mock("../../api/buses");
jest.mock("../../api/drivers");
jest.mock("react-hot-toast");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useBuses", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (driverApi.getAllDrivers as jest.Mock).mockResolvedValue([]);
    (busApi.getAllBuses as jest.Mock).mockResolvedValue([]);
  });

  test("fetches buses successfully", async () => {
    (busApi.getAllBuses as jest.Mock).mockResolvedValue([
      { _id: "1", name: "Bus A", busNumber: "123", capacity: 40 },
    ]);

    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.buses.length).toBe(1));
    expect(result.current.buses[0].name).toBe("Bus A");
  });

  test("fetches drivers successfully", async () => {
    (driverApi.getAllDrivers as jest.Mock).mockResolvedValue([
      { _id: "d1", name: "Driver One" },
    ]);

    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.drivers.length).toBe(1));
    expect(result.current.drivers[0].name).toBe("Driver One");
  });

  test("createBus mutation updates cache and calls toast.success", async () => {
    (busApi.createBus as jest.Mock).mockResolvedValue({
      _id: "2",
      name: "New Bus",
      busNumber: "456",
      capacity: 30,
    });

    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setFormData({
        name: "New Bus",
        number: "456",
        capacity: "30",
        driverId: "",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(toast.success).toHaveBeenCalledWith("Bus added successfully");
    expect(result.current.formData).toEqual({
      name: "",
      number: "",
      capacity: "",
      driverId: "",
    });
  });

  test("updateBus mutation updates existing bus", async () => {
    (busApi.updateBus as jest.Mock).mockResolvedValue({
      _id: "1",
      name: "Updated Bus",
      busNumber: "123",
      capacity: 50,
    });

    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.updateExistingBus("1", {
        name: "Updated Bus",
        number: "123",
        capacity: 50,
        driverId: "d1",
      });
    });

    expect(toast.success).toHaveBeenCalledWith("Bus updated successfully");
  });

  test("deleteBus mutation removes bus", async () => {
    (busApi.deleteBus as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.removeBus("1");
    });

    expect(toast.success).toHaveBeenCalledWith("Bus deleted successfully");
  });

  test("assignDriver mutation triggers invalidate and success toast", async () => {
    (busApi.assignDriverToBus as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.assignDriver("1", "d1");
    });

    expect(toast.success).toHaveBeenCalledWith("Driver assigned successfully");
  });

  test("handleChange updates formData", () => {
    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Bus X" },
      } as any);
    });

    expect(result.current.formData.name).toBe("Bus X");
  });

  test("resetForm clears formData", () => {
    const { result } = renderHook(() => useBuses(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setFormData({
        name: "Bus X",
        number: "999",
        capacity: "40",
        driverId: "d1",
      });
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      name: "",
      number: "",
      capacity: "",
      driverId: "",
    });
  });
});
