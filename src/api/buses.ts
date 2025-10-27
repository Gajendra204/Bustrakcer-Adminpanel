import axiosInstance from "./axiosConfig";
import type { IBus } from "./types";

export async function getAllBuses(): Promise<IBus[]> {
  const response = await axiosInstance.get<{ success: boolean; data: IBus[] }>("/buses");
  return response.data.data; 
};

export async function createBus(data: Omit<IBus, "_id">): Promise<IBus> {
  const response = await axiosInstance.post<{ success: boolean; data: IBus }>("/buses/create-bus", data);
  return response.data.data;
};

export async function assignDriverToBus(data: { busId: string; driverId: string }): Promise<IBus> {
  const response = await axiosInstance.patch<{ success: boolean; data: IBus }>("/buses/assign-driver", data);
  return response.data.data;
};

export async function updateBus(id: string, data: Partial<IBus>): Promise<IBus> {
  const response = await axiosInstance.put<{ success: boolean; data: IBus }>(`/buses/${id}`, data);
  return response.data.data;
};

export async function deleteBus(id: string): Promise<{ success: boolean; message: string }> {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/buses/${id}`);
  return response.data; 
};