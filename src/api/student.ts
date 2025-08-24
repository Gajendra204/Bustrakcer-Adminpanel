import axiosInstance from "./axiosConfig";
import type { CreateStudentData, IStudent } from "./types";

export const getStudentsByRoute = async (routeId: string, classFilter?: number): Promise<IStudent[]> => {
  const url = `/students/route/${routeId}${
    classFilter ? `?class=${classFilter}` : ""
  }`;
  const response = await axiosInstance.get<IStudent[]>(url);
  return response.data;
};

export const createStudent = async (routeId: string, data: CreateStudentData): Promise<IStudent> => {
  const response = await axiosInstance.post<IStudent>(`/students/route/${routeId}`, data);
  return response.data;
};

export const updateStudent = async (id: string, data: Partial<CreateStudentData>): Promise<IStudent> => {
  const response = await axiosInstance.put<IStudent>(`/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/students/${id}`);
  return response.data;
};