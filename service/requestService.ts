import axios, { AxiosError, AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { signIn } from "next-auth/react";

// RequestParameter tipini doğru şekilde tanımlıyoruz
interface RequestParameter {
  controller?: string;
  action?: string;
  id?: string;
  params?: Record<string, any>;
  url?: string;
}

export const getRequest = async (
  requestParameter: RequestParameter
): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ''
  }${requestParameter.id ? `/${requestParameter.id}` : ''}`;

  try {
    const response: AxiosResponse = await axios.get(url, {
      params: {
        ...requestParameter.params,
        PageIndex: 0,
        PageSize: 10,
      },
    });
    return response.data;
  } catch (err) {
    console.error("API request error", err);
    throw err;
  }
};

export const getGuardRequest = async (
  requestParameter: RequestParameter,
  id: string
) => {
  const accessToken = getCookie('next-auth.session-token');
  if (!accessToken) {
    return signIn();
  }

  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `/${id}` : ""}`;
  
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error("Guard API request error", error);

    if (error.response && error.response.status === 401) {
      deleteCookie('next-auth.session-token');
      signIn();
    }
    throw err;
  }
};

export const postRequest = async (
  requestParameter: RequestParameter,
  body: object
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `/${requestParameter.id}` : ""}`;

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (err) {
    console.error("POST request error", err);
    throw err;
  }
};

export const putGuardRequest = async (
  requestParameter: RequestParameter,
  body: object
) => {
  const accessToken = getCookie('next-auth.session-token');
  if (!accessToken) {
    return signIn();
  }

  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }`;
  
  try {
    const response = await axios.put(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (err) {
    console.error("PUT request error", err);
    throw err;
  }
};

export const deleteGuardRequest = async (
  requestParameter: RequestParameter
) => {
  const accessToken = getCookie('next-auth.session-token');
  if (!accessToken) {
    return signIn();
  }

  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${requestParameter.id ? `/${requestParameter.id}` : ""}`;

  try {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (err) {
    console.error("DELETE request error", err);
    throw err;
  }
};

// Eksik olan postMultipartRequest fonksiyonunu ekledim
export const postMultipartRequest = async (
  requestParameter: RequestParameter,
  formData: FormData
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }`;

  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error("Multipart POST request error", err);
    throw err;
  }
};
