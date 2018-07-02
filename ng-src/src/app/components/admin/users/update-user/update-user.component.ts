import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"]
})
export class UpdateUserComponent implements OnInit {
  user;
  currentUrl;

  constructor(
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  onSubmit(f) {
    this.authService.updateUser(this.user).subscribe(data => {
      this.flashMessages.show("Successfully updated user", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate(["/admin/users"]);
    });
  }

  ngOnInit() {
    this.currentUrl = this.activedRoute.snapshot.params;
    this.authService.getUser(this.currentUrl.id).subscribe(userDetails => {
      this.user = (userDetails as any).user;
    });
  }
}
