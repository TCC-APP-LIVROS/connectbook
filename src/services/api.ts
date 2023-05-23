import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

export const api = axios.create({
  baseURL: "http://localhost:3333",
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const InterceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        if (
          error.response.data.message === "token.expired" ||
          error.response.data.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();
            return Promise.reject(error);
          }

          const originalRequestConfig = error.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token) => {
                  originalRequestConfig.headers[
                    "Authorization"
                  ] = `Bearer ${token}`;
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });
              await storageAuthTokenSave(data.token, refresh_token);

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }
              originalRequestConfig.headers[
                "Authorization"
              ] = `Bearer ${data.token}`;
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((promise) => promise.onSuccess(data.token));

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((promise) => promise.onFailure(error));
              failedQueue = [];

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
      } else {
        return Promise.reject(error);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(InterceptTokenManager);
  };
};
