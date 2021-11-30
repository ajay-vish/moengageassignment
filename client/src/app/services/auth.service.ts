import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { map } from "rxjs/operators";
import endpoint from "./config";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  isExpired: boolean = true;
  public jwt: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) {}
	httpOptions = {
		headers: new HttpHeaders({
			Authorization: "",
		}),
	};
  getUserDetails(){
    this.authToken = localStorage.getItem("oauthToken");
		this.httpOptions.headers = this.httpOptions.headers.set(
			"Authorization",
			"Bearer " + this.authToken
		);
    let user = this.jwt.decodeToken(this.authToken);
    let id = user.id;
    
    return this.http.get(`${endpoint}/v1/user/${id}`, this.httpOptions).pipe(
			map((res) => {
				return res;
			})
		);
  }
  isAuthenticated() {
    this.authToken = localStorage.getItem('oauthToken');
    if (this.authToken)
      this.isExpired = this.jwt.isTokenExpired(this.authToken);
    return !this.isExpired;
  }
  logout(){
    localStorage.removeItem('oauthToken')
    return true;
  }
}
