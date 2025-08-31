import axiosInstance from "./axiosConfig";
import type { CreateStudentData, IStudent } from "./types";

export const getStudentsByRoute = async (
  routeId: string,
  classFilter?: number
): Promise<IStudent[]> => {
  const url = `/students/route/${routeId}${classFilter ? `?class=${classFilter}` : ""}`;
  const response = await axiosInstance.get<{ success: boolean; data: IStudent[] }>(url);
  return response.data.data;
};

export const createStudent = async (
  routeId: string,
  data: CreateStudentData
): Promise<IStudent> => {
  const response = await axiosInstance.post<{ success: boolean; data: IStudent }>(
    `/students/route/${routeId}`,
    data
  );
  return response.data.data;
};

export const updateStudent = async (
  id: string,
  data: Partial<CreateStudentData>
): Promise<IStudent> => {
  const response = await axiosInstance.put<{ success: boolean; data: IStudent }>(
    `/students/${id}`,
    data
  );
  return response.data.data;
};

export const deleteStudent = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(
    `/students/${id}`
  );
  return response.data;
};
