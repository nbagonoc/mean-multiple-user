import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  authToken: any;
  user: any;
  url = "http://localhost:5000/api/users";
  // url = "api/users";

  constructor(private http: HttpClient) {}

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  // CRUD USER

  // GET | api/users/profile
  // view current user for profile
  viewUser() {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get(this.url + "/profile", {
      headers
    });
  }

  // GET | api/users
  // view users
  viewUsers() {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get(this.url, {
      headers
    });
  }

  // GET | api/users/show/:id
  // get a user
  getUser(id) {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get(this.url + "/show/" + id, {
      headers
    });
  }

  // PUT | api/users/update (NEED TO REFACTOR THIS AGAIN)
  // update user
  updateUser(user) {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.put(this.url + "/update/" + user._id, user, {
      headers
    });
  }

  // DELETE | api/users/delete/:id
  // delete user
  deleteUser(id) {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.delete(this.url + "/delete/" + id, {
      headers
    });
  }
}
