import axiosInstance from "./axiosConfig";
import type { IRoute, CreateRouteData, UpdateRouteData, AssignBusData } from "./types";

export const getAllRoutes = async (): Promise<IRoute[]> => {
  const response = await axiosInstance.get<{ success: boolean; data: IRoute[] }>("/routes");
  return response.data.data;
};

export const getRouteById = async (id: string): Promise<IRoute> => {
  const response = await axiosInstance.get<{ success: boolean; data: IRoute }>(`/routes/${id}`);
  return response.data.data;
};

export const createRoute = async (data: CreateRouteData): Promise<IRoute> => {
  const response = await axiosInstance.post<{ success: boolean; data: IRoute }>("/routes", data);
  return response.data.data;
};

export const updateRoute = async (id: string, data: UpdateRouteData): Promise<IRoute> => {
  const response = await axiosInstance.put<{ success: boolean; data: IRoute }>(`/routes/${id}`, data);
  return response.data.data;
};

export const deleteRoute = async (id: string): Promise<{ success: boolean; message: string }>  => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/routes/${id}`);
  return response.data;
};

export const assignBusToRoute = async (routeId: string, data: AssignBusData): Promise<IRoute> => {
  const response = await axiosInstance.patch<{ success: boolean; data: IRoute }>(`/routes/${routeId}/assign-bus`, data);
  return response.data.data;
};
