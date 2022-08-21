import { Component, OnInit, OnDestroy, Optional, AfterViewInit } from '@angular/core';
import { Auth, authState, signOut, User, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, sendEmailVerification } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { environment } from '../../environments/environment';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-auth',
  template: `
    <section>
      Auth!
      <code>{{ (user | async)?.uid }}</code>
      <div [hidden]="showLogoutButton" id="firebaseui-auth-container"></div>
      <button (click)="login()" *ngIf="showLoginButton">Log in with Google</button>
      <button (click)="loginWithLinkToEmail()" *ngIf="showLoginButton">Se connecter grâce à un lien envoyé sur votre adresse mail</button>
      <button (click)="logout()" *ngIf="showLogoutButton">Log out</button>
      <button (click)="sendEmail()" *ngIf="showLogoutButton">Send verification email</button>
    </section>
  `,
  styles: [`
    .hidden {
      display: none;
    }
  `]
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.user.subscribe(() => {
      if (this.showLoginButton) {
        this.loginWithFirebaseUi();
      }
    });
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginWithFirebaseUi() {
    const actionCodeSettings = {
      url: environment.firebaseAuthorizedDomain,
      handleCodeInApp: true
    }
    const uiConfig = {
      signInSuccessUrl: environment.firebaseAuthorizedDomain,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          forceSameDevice: false,
          emailLinkSignIn: () => actionCodeSettings,
        },
      ],
      tosUrl: `${environment.firebaseAuthorizedDomain}/terms-of-service`,
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign(`${environment.firebaseAuthorizedDomain}/privacy-policy`);
      }
    };

    const ui = new firebaseui.auth.AuthUI(this.auth);
    // Note, render conditionnaly as described https://firebase.google.com/docs/auth/web/firebaseui breaks flow
    // Don't know why
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  /**
   * See also https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0&hl=en
   * TODO not finished
   */
  async loginWithLinkToEmail() {
    const actionCodeSettings = {
      url: environment.firebaseAuthorizedDomain,
      // This must be true.
      handleCodeInApp: true
    }
    try {
      // TODO
      return await sendSignInLinkToEmail(this.auth, 'julio@sogilis.com', actionCodeSettings);
    } catch(error) {
      console.error(error);
      throw new Error('Auth fail');
    }
  }

  async sendEmail() {
    return sendEmailVerification(this.auth.currentUser as User)
  }

  async logout() {
    return await signOut(this.auth);
  }

}
