import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  canActivate() {
    if (this.authService.currentUser.role == "admin") {
      return true;
    } else {
      this.flashMessages.show("You are not authorized to view that page", {
        cssClass: "alert-danger",
        timeout: 5000
      });
      this.router.navigate(["/dashboard"]);
      return false;
    }
  }
}
