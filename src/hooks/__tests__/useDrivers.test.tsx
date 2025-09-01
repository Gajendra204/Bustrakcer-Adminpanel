import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrivers } from "../useDrivers";
import * as driverApi from "../../api/drivers";
import toast from "react-hot-toast";

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

describe("useDrivers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Safe defaults so React Query doesn't log warnings
    (driverApi.getAllDrivers as jest.Mock).mockResolvedValue([]);
  });

  test("fetches drivers successfully", async () => {
    (driverApi.getAllDrivers as jest.Mock).mockResolvedValue([
      { _id: "d1", name: "Driver One", phone: "1234567890" },
    ]);

    const { result } = renderHook(() => useDrivers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.drivers.length).toBe(1));
    expect(result.current.drivers[0].name).toBe("Driver One");
  });

  test("createDriver mutation updates cache and calls toast.success", async () => {
    (driverApi.createDriver as jest.Mock).mockResolvedValue({
      _id: "d2",
      name: "New Driver",
      phone: "1111111111",
    });

    const { result } = renderHook(() => useDrivers(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setFormData({ name: "New Driver", phone: "1111111111" });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(toast.success).toHaveBeenCalledWith("Driver added");
    expect(result.current.formData).toEqual({ name: "", phone: "" });
  });

  test("updateDriver mutation updates existing driver", async () => {
    (driverApi.updateDriver as jest.Mock).mockResolvedValue({
      _id: "d1",
      name: "Updated Driver",
      phone: "9999999999",
    });

    const { result } = renderHook(() => useDrivers(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.updateExistingDriver("d1", {
        name: "Updated Driver",
        phone: "9999999999",
      });
    });

    expect(toast.success).toHaveBeenCalledWith("Driver updated successfully");
  });

  test("deleteDriver mutation removes driver", async () => {
    (driverApi.deleteDriver as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDrivers(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.removeDriver("d1");
    });

    expect(toast.success).toHaveBeenCalledWith("Driver deleted successfully");
  });

  test("handleChange updates formData", () => {
    const { result } = renderHook(() => useDrivers(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Driver X" },
      } as any);
    });

    expect(result.current.formData.name).toBe("Driver X");
  });

  test("resetForm clears formData", () => {
    const { result } = renderHook(() => useDrivers(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setFormData({ name: "Driver X", phone: "12345" });
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({ name: "", phone: "" });
  });
});
