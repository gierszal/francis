import { RefreshResponse } from "@/types/auth";
import axios, { InternalAxiosRequestConfig } from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api/v1",
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

let refreshPromise: Promise<RefreshResponse | null> | null = null;

async function getTokenPair(): Promise<RefreshResponse | null> {
  try {
    const { data } = await axios.get<RefreshResponse>(
      "http://localhost:5000/api/v1/auth/refresh",
      { withCredentials: true },
    );
    setAccessToken(data.data.accessToken);
    return data;
  } catch {
    return null;
  }
}
$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = getTokenPair().finally(() => {
        refreshPromise = null;
      });
    }

    const data = await refreshPromise.then();

    if (accessToken) {
      originalRequest._retry = true;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return $api(originalRequest);
    }

    setAccessToken(null);
    return Promise.reject(error);
  },
);

export default $api;
