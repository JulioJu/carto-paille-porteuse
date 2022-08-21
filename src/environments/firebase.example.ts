/**
 * A file ./firebase.ts should exists
 * See also https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
 * Note, as it's a frontend application, credentials could be retrieved into bundle
 */
export const firebaseCredentials = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '<your-app-id>',
  measurementId: '<your-measurement-id>'
}

/**
 * See also https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0&hl=en#send_an_authentication_link_to_the_users_email_address
 */
export const firebaseAuthorizedDomain = "https://example.web.app";
