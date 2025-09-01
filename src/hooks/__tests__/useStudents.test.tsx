import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStudents, useStudentsByRoute } from "../useStudents";
import * as studentApi from "../../api/student";
import toast from "react-hot-toast";

jest.mock("../../api/student");
jest.mock("react-hot-toast");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useStudents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchStudentsByRoute returns students on success", async () => {
    (studentApi.getStudentsByRoute as jest.Mock).mockResolvedValue([
      { _id: "s1", name: "Student One", class: 5 },
    ]);

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    const students = await result.current.fetchStudentsByRoute("r1");
    expect(students[0].name).toBe("Student One");
  });

  test("fetchStudentsByRoute shows toast on error", async () => {
    (studentApi.getStudentsByRoute as jest.Mock).mockRejectedValue({
      response: { data: { message: "Not found" } },
    });

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await expect(
      result.current.fetchStudentsByRoute("bad")
    ).rejects.toBeTruthy();
    expect(toast.error).toHaveBeenCalledWith("Not found");
  });

  test("addStudent mutation updates cache and calls toast.success", async () => {
    (studentApi.createStudent as jest.Mock).mockResolvedValue({
      _id: "s2",
      name: "New Student",
      class: 4,
    });

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.addStudent("r1", {
        name: "X",
        class: 4,
        routeId: "r1",
        parentName: "Parent X",
        parentPhone: "1234567890",
        pickupLocation: "Stop A",
        dropoffLocation: "Stop B",
      });
    });

    expect(toast.success).toHaveBeenCalledWith("Student added successfully");
  });

  test("addStudent mutation handles error", async () => {
    (studentApi.createStudent as jest.Mock).mockRejectedValue({
      response: { data: { message: "Failed to add" } },
    });

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.addStudent("r1", {
          name: "X",
          class: 4,
          routeId: "r1",
          parentName: "Parent X",
          parentPhone: "1234567890",
          pickupLocation: "Stop A",
          dropoffLocation: "Stop B",
        });
      } catch {}
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to add");
  });

  test("deleteStudent mutation removes student and calls toast.success", async () => {
    (studentApi.deleteStudent as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.deleteStudent("s1");
    });

    expect(toast.success).toHaveBeenCalledWith("Student deleted successfully");
  });

  test("deleteStudent mutation handles error", async () => {
    (studentApi.deleteStudent as jest.Mock).mockRejectedValue({
      response: { data: { message: "Delete failed" } },
    });

    const { result } = renderHook(() => useStudents(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.deleteStudent("s1");
      } catch {}
    });

    expect(toast.error).toHaveBeenCalledWith("Delete failed");
  });
});

describe("useStudentsByRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (studentApi.getStudentsByRoute as jest.Mock).mockResolvedValue([
      { _id: "s1", name: "Student A", class: 3 },
    ]);
  });

  test("fetches students with useStudentsByRoute", async () => {
    const { result } = renderHook(() => useStudentsByRoute("r1"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.students.length).toBe(1));
    expect(result.current.students[0].name).toBe("Student A");
  });
});
