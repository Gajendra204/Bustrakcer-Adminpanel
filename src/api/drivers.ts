import axiosInstance from "./axiosConfig";
import type { IDriver } from "./types";


export async function getAllDrivers(): Promise<IDriver[]> {
  const response = await axiosInstance.get<{ success: boolean; data: IDriver[] }>("/driver");
  return response.data.data;
};

export async function createDriver(data: Omit<IDriver, "_id">): Promise<IDriver> {
  const response = await axiosInstance.post<{ success: boolean; data: IDriver }>("/driver/create", data);
  return response.data.data;
};

export async function updateDriver(
  id: string,
  data: Partial<Omit<IDriver, "_id">>
): Promise<IDriver> {
  const response = await axiosInstance.put<{ success: boolean; data: IDriver }>(`/driver/${id}`, data);
  return response.data.data;
};

export async function deleteDriver(
  id: string
): Promise<{ success: boolean; message: string }> {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/driver/${id}`);
  return response.data; 
};