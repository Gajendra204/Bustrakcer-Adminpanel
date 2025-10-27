import axiosInstance from "./axiosConfig";
import type { LoginData, RegisterData} from "./types";
import * as Sentry from "@sentry/react";

export async function loginAdmin(data: LoginData) {
  try {
    const response = await axiosInstance.post("/auth/admin/login", data);
    
    const token = response?.data?.data?.token;    

    if (!token) {
    throw new Error("Login failed: Token not received.");
}

    localStorage.setItem("busTrackerAdminToken", token); 
    return response.data;
  } catch (error) {
    console.error("Login error", error)
    Sentry.captureException(error);
    throw error;
  }
};

export async function registerAdmin(data: RegisterData) {
  try{
  const response = await axiosInstance.post("/auth/admin/register", data);
  return response.data;
  } catch (error) {
    console.error("Registration error", error);
    Sentry.captureException(error);
    throw error;
  }
};

