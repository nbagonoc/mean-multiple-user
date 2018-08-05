import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../../../services/users.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
  user;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  onSubmit(f) {
    this.usersService.updateUser(this.user).subscribe(data => {
      this.flashMessages.show("Successfully updated profile", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate(["/profile"]);
    });
  }

  ngOnInit() {
    this.usersService.viewUser().subscribe(userDetails => {
      this.user = (userDetails as any).user;
    });
  }
}
