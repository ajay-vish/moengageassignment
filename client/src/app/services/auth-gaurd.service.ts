import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  login = "https://moengage-ajay.herokuapp.com/auth/";
  clientId = 'ab7e4a3c-1422-40ba-a412-2847e73939d9';
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      let api = `https://api.aniapi.com/v1/oauth?response_type=token&client_id=${this.clientId}&redirect_uri=${this.login}`
      window.location.href = api;
      console.log(api);
      
      return false;
    }
    return true;
  }
}