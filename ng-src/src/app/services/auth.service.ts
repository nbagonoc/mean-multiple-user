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

  // Signup
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "applications/json");
    // return this.http.post("http://localhost:5000/users/register", user, {
    return this.http.post("users/register", user, {
      headers
    });
  }

  // Check user data
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "applications/json");
    // return this.http.post("http://localhost:5000/users/authenticate", user, {
    return this.http.post("users/authenticate", user, {
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
