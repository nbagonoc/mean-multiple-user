import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: object;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.viewUser().subscribe(userDetails => {
      this.user = (userDetails as any).user;
    });
  }
}
