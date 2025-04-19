import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import { store } from "../redux/store";
import { clearAuth, refreshToken } from "../redux/authSlice";

// API için axios instance oluştur
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

// Token'ın geçerli olup olmadığını kontrol et 
const isTokenExpiringSoon = (): boolean => {
  const state = store.getState();
  const auth = state.auth;
  
  if (!auth.tokenExpiresAt || !auth.token) {
    return false;
  }
  
  // Token süresinin dolmasına 30 saniyeden az kaldıysa
  const timeToExpiry = auth.tokenExpiresAt - Date.now();
  return timeToExpiry < 30000; // 30 saniye
};

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Mevcut tokeni al
    const token = getCookie('next-auth.session-token');
    
    // State'i kontrol et
    const state = store.getState();
    const auth = state.auth;
    
    // Eğer token varsa ve yakında sona erecekse ve şu anda yenilenmiyor ise
    if (token && isTokenExpiringSoon() && !auth.isRefreshing) {
      try {
        // Göndermeden önce tokeni yenile
        const result = await store.dispatch(refreshToken());
        
        // Yeni token ile isteği güncelle (başarıyla yenilendiyse)
        if (refreshToken.fulfilled.match(result)) {
          // Yeni token'ı al
          const newToken = result.payload.token;
          if (newToken) {
            // Header'ı güncelle
            config.headers.Authorization = `Bearer ${newToken}`;
            return config;
          }
        }
      } catch (error) {
        console.error('Token refresh error in interceptor:', error);
      }
    } 
    
    // Normal durumda mevcut tokeni kullan
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
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Eğer 401 hatası alınırsa ve istek yinelenmediyse token yenilemeyi dene
    if (error.response?.status === 401 && !originalRequest?.headers['X-Retry']) {
      try {
        // Token'ı yenile
        const result = await store.dispatch(refreshToken());
        
        // Token başarıyla yenilendiyse, orijinal isteği tekrar gönder
        if (refreshToken.fulfilled.match(result)) {
          const newToken = result.payload.token;
          
          // İsteği yeniden oluştur
          const newRequest = {
            ...originalRequest,
            headers: {
              ...originalRequest?.headers,
              'Authorization': `Bearer ${newToken}`,
              'X-Retry': 'true' // Sonsuz döngüyü önlemek için
            }
          };
          
          return axios(newRequest);
        }
      } catch {
        // Token yenileme başarısız olursa oturumu kapat
        store.dispatch(clearAuth());
      }
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
  return `${requestParameter.controller ?? ''}${
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
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Backend Response:", response.data);
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
  data?: any
): Promise<any> => {
  const token = getCookie("next-auth.session-token");
  
  if (!token) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const url = buildUrl(requestParameter);

  try {
    const response: AxiosResponse = await api.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Guard POST request error", err); // 🔥 Hata detaylı loglanıyor mu?
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
