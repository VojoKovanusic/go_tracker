import {Injectable} from "@angular/core";
import {User} from "../_models/user";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {Role} from "@app/_models/role";

@Injectable({providedIn: 'root'})
// @ts-ignore
export class AuthChecker {
  user: User;

  constructor(private authenticationService: AuthenticationService, private route: Router) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  getLoggedUser() {
    return this.user;
  }

  logout() {
    this.authenticationService.logout()
  }

  getRole() {
    return this.user.role;
  }

  isClient() {
    return this.user.role === Role.CLIENT_ROLE
  }

  isAdmin() {
    return this.user.role === Role.ADMIN_ROLE
  }

}
