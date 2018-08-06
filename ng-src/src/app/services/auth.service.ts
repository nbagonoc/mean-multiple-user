import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  // POST | api/users/register
  // register user
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "applications/json");
    // return this.http.post("http://localhost:5000/api/auth/register", user, {
    return this.http.post("api/auth/register", user, {
      headers
    });
  }

  // POST | api/users/login
  // authenticate/login user
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "applications/json");
    // return this.http.post("http://localhost:5000/api/auth/login", user, {
    return this.http.post("api/auth/login", user, {
      headers
    });
  }

  // store token and user data
  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  isLoggedIn() {
    return tokenNotExpired("id_token");
  }

  // use to check users name, id, and role; To hide show elements, and setup guard/middleware
  get currentUser() {
    this.loadToken();
    if (!this.authToken) return null;
    return new JwtHelper().decodeToken(this.authToken);
  }

  // signout
  logout() {
    this.authToken = null;
    localStorage.clear();
  }
}
