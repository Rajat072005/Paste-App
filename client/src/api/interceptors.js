import { api } from "./api";

let requestCount = 0;

export const setupInterceptors = (setLoading) => {
  api.interceptors.request.use((config) => {
    requestCount++;
    setLoading(true);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      requestCount--;
      if (requestCount === 0) setLoading(false);
      return response;
    },
    (error) => {
      requestCount--;
      if (requestCount === 0) setLoading(false);
      return Promise.reject(error);
    }
  );
};
