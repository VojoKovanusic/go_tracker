import {Component} from '@angular/core';
import {User} from "../../generated/model";
import {Role} from "@app/_models/role";
import {AuthenticationService} from "@app/_services/authentication.service";
import {Router} from "@angular/router";
import {LoggedRevolver} from "@app/_services/logedd-reolver.service";

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

  get isScanner() {
    return this.user.role === Role.SCANNER_ROLE;
  }

  logout() {
    this.authenticationService.logout();
  }

  addClient() {
    this.route.navigate(['/addClient'])
  }

  isClient() {
    return this.logedResolver.isClient()
  }
}
