import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/AuthenticationService";
import {User} from "../../models/models";
import {LoggedRevolver} from "../../auth/LoggedRevolver";
import {Role} from "../../auth/role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  user: User;

  constructor(private logedResolver:LoggedRevolver , private authenticationService: AuthenticationService, private route: Router) {
    this.authenticationService.user.subscribe(u => this.user = u);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.ADMIN_ROLE;
  }




  logout() {

    this.authenticationService.logout();
  }

  isUserLogIn() {
    return this.user != null;
  }
}
