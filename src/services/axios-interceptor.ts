import Parse from "parse/dist/parse.min.js";
import axios from "axios";

// Inspired from https://github.com/jhipster/jhipster-sample-app-vuejs/blob/93f3895adb76b87b7f7f8bc89e95ecd083c7f985/src/main/webapp/app/shared/config/axios-interceptor.ts
// With Parse Platform, session id is sent into HTTP body, with the JSON

/**
 * If we are not connected.
 * When we try to create a protected "Parse Platform Database class" without
 * be connected, we have a HTTP code 200.
 *
 * If we are connected with a "user" that has no "role" admin.
 * When we try to to create "Parse Platform Database class" with a
 * "Class Level Permission" set only for `role:admin`, we have an error 400.
 */
const onUnauthenticated = (error: any) => {
  const status = error.status || error.response.status;
  if (status === 401) {
    Parse.User.logOut();
  }
  alert("Unauthorized!");
  return Promise.reject(error);
};

const onServerError = (error: any) => {
  alert("Server error!");
  return Promise.reject(error);
};

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
    axios.interceptors.response.use((res) => res, onResponseError);
  }
};
