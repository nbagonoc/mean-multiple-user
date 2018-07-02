import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: object;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.viewUsers().subscribe(userDetails => {
      this.users = (userDetails as any).users;
    });
  }
}
