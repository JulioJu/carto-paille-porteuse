import type { AxiosRequestConfig } from "axios";
import axios from "axios";

// Inspired from https://github.com/jhipster/jhipster-sample-app-vuejs/blob/93f3895adb76b87b7f7f8bc89e95ecd083c7f985/src/main/webapp/app/shared/config/axios-interceptor.ts

const onRequestSuccess = (config: AxiosRequestConfig) => {
  // Security considerations https://auth0.com/blog/secure-browser-storage-the-facts/
  const token = localStorage.getItem('app-authenticationToken') || sessionStorage.getItem('app-authenticationToken');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.info("Not already logged");
  }
  return config;
};

const onUnauthenticated = (error: any) => {
  const url = error.response?.config?.url;
  const status = error.status || error.response.status;
  if (status === 401) {
    console.error("TODO Logout")
    if (!url.endsWith('api/account') && !url.endsWith('api/authenticate')) {
      // Ask for a new authentication
      console.error("loginService.openLogin(vue)");
      return;
    }
  }
  console.log('Unauthorized!');
  return Promise.reject(error);
}

const onServerError = (error: any) => {
  console.log('Server error!');
  return Promise.reject(error);
}

export default () => {
  const onResponseError = (err: any) => {
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      return onUnauthenticated(err);
    }
    if (status >= 500) {
      return onServerError(err);
    }
    return Promise.reject(err);
  };

  if (axios.interceptors) {
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(res => res, onResponseError);
  }
};
