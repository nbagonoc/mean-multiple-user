import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
  user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  onSubmit(f) {
    this.authService.updateUser(this.user).subscribe(data => {
      this.flashMessages.show("Successfully updated profile", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate(["/profile"]);
    });
  }

  ngOnInit() {
    this.authService.viewUser().subscribe(userDetails => {
      this.user = (userDetails as any).user;
    });
  }
}
