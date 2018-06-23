import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user: object;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.user = (profile as any).user;
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
