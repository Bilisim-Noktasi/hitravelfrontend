import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { store } from "../redux/store";
import { clearAuth } from "../redux/authSlice";

// API için axios instance oluştur
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie('next-auth.session-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired veya geçersiz
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  }
);

// RequestParameter tipini doğru şekilde tanımlıyoruz
interface RequestParameter {
  controller?: string;
  action?: string;
  id?: string;
  params?: Record<string, any>;
  url?: string;
}

// URL oluşturma yardımcı fonksiyonu
const buildUrl = (requestParameter: RequestParameter): string => {
  return `/${requestParameter.controller ?? ''}${
    requestParameter.action ? `/${requestParameter.action}` : ''
  }${requestParameter.id ? `/${requestParameter.id}` : ''}`;
};

export const getRequest = async (
  requestParameter: RequestParameter
): Promise<any> => {
  const url = buildUrl(requestParameter);

  try {
    const response: AxiosResponse = await api.get(url, {
      params: requestParameter.params,
    });
    return response.data;
  } catch (err) {
    console.error("API request error", err);
    throw err;
  }
};

export const getGuardRequest = async (
  requestParameter: RequestParameter
): Promise<any> => {
  const token = getCookie("next-auth.session-token");
  if (!token) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const url = buildUrl(requestParameter);

  try {
    const response: AxiosResponse = await api.get(url, {
      params: requestParameter.params,
    });
    return response.data;
  } catch (err) {
    console.error("Guard API request error", err);
    throw err;
  }
};

export const postRequest = async (
  requestParameter: RequestParameter,
  body: object
): Promise<any> => {
  const url = buildUrl(requestParameter);

  try {
    const response = await api.post(url, body);
    return response.data;
  } catch (err) {
    console.error("POST request error", err);
    throw err;
  }
};

export const postGuardRequest = async (
  requestParameter: RequestParameter,
  body: object
): Promise<any> => {
  const token = getCookie("next-auth.session-token");
  if (!token) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const url = buildUrl(requestParameter);

  try {
    const response = await api.post(url, body);
    return response.data;
  } catch (err) {
    console.error("Guard POST request error", err);
    throw err;
  }
};

export const putGuardRequest = async (
  requestParameter: RequestParameter,
  body: object
): Promise<any> => {
  const token = getCookie('next-auth.session-token');
  if (!token) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const url = buildUrl(requestParameter);
  
  try {
    const response = await api.put(url, body);
    return response.data;
  } catch (err) {
    console.error("PUT request error", err);
    throw err;
  }
};

export const deleteGuardRequest = async (
  requestParameter: RequestParameter
): Promise<any> => {
  const token = getCookie('next-auth.session-token');
  if (!token) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const url = buildUrl(requestParameter);

  try {
    const response = await api.delete(url);
    return response.data;
  } catch (err) {
    console.error("DELETE request error", err);
    throw err;
  }
};

// Multipart request for file uploads
export const postMultipartRequest = async (
  requestParameter: RequestParameter,
  formData: FormData
): Promise<any> => {
  const url = buildUrl(requestParameter);

  try {
    const response = await api.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error("Multipart POST request error", err);
    throw err;
  }
};

// Guard multipart request
export const postMultipartGuardRequest = async (
  requestParameter: RequestParameter,
  formData: FormData
): Promise<any> => {
  const token = getCookie('next-auth.session-token');
  if (!token) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const url = buildUrl(requestParameter);

  try {
    const response = await api.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error("Guard Multipart POST request error", err);
    throw err;
  }
};
