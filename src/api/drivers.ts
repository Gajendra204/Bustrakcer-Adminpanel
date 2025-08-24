import axiosInstance from "./axiosConfig";
import type { IDriver } from "./types";

export const getAllDrivers = async (): Promise<IDriver[]> => {
  const response = await axiosInstance.get("/driver");
  return response.data;
};

export const createDriver = async (data: Omit<IDriver, "_id">): Promise<IDriver> => {
  const response = await axiosInstance.post("/driver/create", data);
  return response.data;
};

export const updateDriver = async (
  id: string,
  data: Partial<Omit<IDriver, "_id">> 
): Promise<IDriver> => {
  const response = await axiosInstance.put<IDriver>(`/driver/${id}`, data);
  return response.data;
};

export const deleteDriver = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/driver/${id}`);
  return response.data;
};