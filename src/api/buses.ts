import axiosInstance from "./axiosConfig";
import type { IBus } from "./types";

export const getAllBuses = async (): Promise<IBus[]> => {
  const response = await axiosInstance.get<IBus[]>("/buses");
  return response.data;
};

export const createBus = async (data: Omit<IBus, "_id">): Promise<IBus> => {
  const response = await axiosInstance.post<IBus>("/buses/create-bus", data);
  return response.data;
};

export const assignDriverToBus = async (data: { busId: string, driverId: string }): Promise<IBus> => {
  const response = await axiosInstance.patch<IBus>("/buses/assign-driver", data);
  return response.data;
};

export const updateBus = async (id: string, data: Partial<IBus>): Promise<IBus> => {
  const response = await axiosInstance.put<IBus>(`/buses/${id}`, data);
  return response.data;
};

export const deleteBus = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/buses/${id}`);
  return response.data;
};