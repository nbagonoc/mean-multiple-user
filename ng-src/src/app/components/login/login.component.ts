import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {}

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    // required fields
    if (!this.validateService.validateLogin(user)) {
      this.flashMessagesService.show("Please fill in all values", {
        cssClass: "alert-danger",
        timeout: 5000
      });
      return false;
    } else {
      // validate email
      if (!this.validateService.validateEmail(user.email)) {
        this.flashMessagesService.show("Please provide a valid email", {
          cssClass: "alert-danger",
          timeout: 5000
        });
        return false;
      }
      // Check Database
      else {
        this.authService.authenticateUser(user).subscribe(data => {
          if ((data as any).success) {
            this.authService.storeUserData(
              (data as any).token,
              (data as any).user
            );
            this.router.navigate(["dashboard"]);
          }
          // display error messages
          else {
            this.flashMessagesService.show((data as any).message, {
              cssClass: "alert-danger",
              timout: 5000
            });
            this.router.navigate(["login"]);
          }
        });
      }
    }
  }
}
