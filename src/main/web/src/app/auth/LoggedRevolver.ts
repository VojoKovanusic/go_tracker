import {Injectable} from "@angular/core";

import {Router} from "@angular/router";
import {Role} from "./role";
import {AuthenticationService} from "./AuthenticationService";
import {User} from "../models/models";
@Injectable({providedIn: 'root'})
// @ts-ignore
export class LoggedRevolver {
  user: User;

  constructor(private authenticationService: AuthenticationService, private route: Router) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }


  logout() {
    this.authenticationService.logout()
  }


  isAdmin() {
    return this.user.role === Role.ADMIN_ROLE
  }

}
