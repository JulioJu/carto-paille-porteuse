import { firebaseAuthorizedDomain, firebaseCredentials } from "./firebase";

export const environment = {
  firebase: firebaseCredentials,
  production: true,
  firebaseAuthorizedDomain,
};
