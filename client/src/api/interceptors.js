import { api } from "./api";
let isSet = false;
let requestCount = 0;

export const setupInterceptors = (setLoading) => {
  if (isSet) return;
  isSet = true;
  
  api.interceptors.request.use((config) => {
    console.log("API STARTED");
    requestCount++;
    setLoading(true);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log("API ENDED");
      requestCount--;
      if (requestCount === 0) setLoading(false);
      return response;
    },
    (error) => {
      console.log("API ERROR");
      requestCount--;
      if (requestCount === 0) setLoading(false);
      return Promise.reject(error);
    }
  );
};
