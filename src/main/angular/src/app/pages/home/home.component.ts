import {Component} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {AuthenticationService} from "../../_services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../../../generated/model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent {
  loading = false;
  user: User;
  userFromApi: User;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService, private route: Router) {
    this.user = this.authenticationService.userValue;
  }

  addClient() {
    this.route.navigate(['/addClient'])
  }

  addUser() {
    this.route.navigate(['/addUser'])
  }

  isClient() {
    return this.user.role === "CLIENT_ROLE"
  }

  currentlyLoginClientProfile() {
    this.route.navigate([`/clients`])
  }
}
