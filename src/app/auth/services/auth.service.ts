import { Injectable, NgZone, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  public loggedUser?: any;

  constructor() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
      } else {
        localStorage.setItem('loggedUser', 'null');
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.loggedUser = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.loggedUser = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  observeUserState() {
    this.afAuth.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['/home']));
    });
  }

  get isLoggedIn(): boolean {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
    return loggedUser !== null;
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('loggedUser');
      this.router.navigate(['/auth/login']);
    });
  }
}
