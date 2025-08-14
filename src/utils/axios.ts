import { toast, Id, TypeOptions } from "react-toastify";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define API base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Export the axios instance so it can be imported elsewhere
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Default timeout in milliseconds
});

// Axios request interceptor for Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to make Axios requests
export const request = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();
  const timeout = config.timeout || 10000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    if (config.data instanceof FormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await axiosInstance.request({
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(`⏱️ Request timed out after ${timeout / 1000}s`);
    }

    if (error.response) {
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Server responded with an error.";
      throw new Error(`❌ ${message}`);
    }

    if (error.request) {
      throw new Error("📡 No response from server. Please check your network.");
    }

    throw new Error(`⚠️ Unexpected error: ${error.message || "Unknown error"}`);
  }
};

// Toast helper
const handleToast = (
  id: Id | null,
  status: "loading" | "success" | "error",
  message: string,
  dismissToast: boolean
): void => {
  if (id === null) return;
  if (dismissToast) return toast.dismiss(id);

  let toastType: TypeOptions = "default";
  if (status === "success") toastType = "success";
  else if (status === "error") toastType = "error";

  toast.update(id, {
    render: message,
    type: toastType,
    isLoading: status === "loading",
    autoClose: status !== "loading" ? 3000 : false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Utility functions
export const Fetch = async <T>(
  url: string,
  params?: Record<string, unknown>,
  timeout?: number,
  dismissToast = false,
  showToast = true
): Promise<T> => {
  const toastId = showToast ? toast.loading("Please wait...") : null;
  try {
    const response = await request<T>({ method: "GET", url, params, timeout });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Fetched successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: unknown) {
    const errMessage = (error as Error).message || "Failed to fetch data";
    handleToast(toastId, "error", errMessage, dismissToast);
    throw error;
  }
};

export const Post = async <T>(
  url: string,
  data: Record<string, unknown> | FormData,
  timeout?: number,
  dismissToast = false
): Promise<T> => {
  const toastId = toast.loading("Please wait...");
  try {
    const response = await request<T>({ method: "POST", url, data, timeout });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Submitted successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: unknown) {
    const errMessage = (error as Error).message || "Failed to submit data";
    handleToast(toastId, "error", errMessage, dismissToast);
    throw error;
  }
};

export const Put = async <T>(
  url: string,
  data: Record<string, unknown> | FormData,
  timeout?: number,
  dismissToast = false
): Promise<T> => {
  const toastId = toast.loading("Updating data...");
  try {
    const response = await request<T>({ method: "PUT", url, data, timeout });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Updated successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: unknown) {
    const errMessage = (error as Error).message || "Failed to update data";
    handleToast(toastId, "error", errMessage, dismissToast);
    throw error;
  }
};

export const Delete = async <T>(
  url: string,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
  timeout?: number,
  dismissToast = false
): Promise<T> => {
  const toastId = toast.loading("Deleting data...");
  try {
    const response = await request<T>({
      method: "DELETE",
      url,
      data,
      params,
      timeout,
    });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Deleted successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: unknown) {
    const errMessage = (error as Error).message || "Failed to delete data";
    handleToast(toastId, "error", errMessage, dismissToast);
    throw error;
  }
};

export const Patch = async <T>(
  url: string,
  data: Record<string, unknown> | FormData,
  timeout?: number,
  dismissToast = false
): Promise<T> => {
  const toastId = toast.loading("Updating data...");
  try {
    const response = await request<T>({ method: "PATCH", url, data, timeout });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Updated successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: unknown) {
    const errMessage = (error as Error).message || "Failed to update data";
    handleToast(toastId, "error", errMessage, dismissToast);
    throw error;
  }
};
