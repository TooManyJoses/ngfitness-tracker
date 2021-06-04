import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from "./auth-data.modle";
import { User } from "./user.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | null = null;

  constructor(private router: Router) {

  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
  };

  login(authData: AuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
    this.successAuth()
  }

  logout(){
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private successAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
