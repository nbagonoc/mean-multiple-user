import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-get-user",
  templateUrl: "./get-user.component.html",
  styleUrls: ["./get-user.component.css"]
})
export class GetUserComponent implements OnInit {
  user;
  currentUrl;

  constructor(
    private usersService: UsersService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  onDelete() {
    this.currentUrl = this.activedRoute.snapshot.params;
    this.usersService.deleteUser(this.currentUrl.id).subscribe(userDetails => {
      this.flashMessages.show("Successfully deleted user", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate(["/admin/users"]);
    });
  }

  ngOnInit() {
    this.currentUrl = this.activedRoute.snapshot.params;
    this.usersService.getUser(this.currentUrl.id).subscribe(userDetails => {
      this.user = (userDetails as any).user;
    });
  }
}
