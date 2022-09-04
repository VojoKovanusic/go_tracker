import {Component} from '@angular/core';
import {Role} from "@app/_models/role";
import {AuthenticationService} from "@app/_services/authentication.service";
import {User} from "../generated/model";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user && this.user.role === Role.ADMIN_ROLE;
    }
    get isUser() {
        return this.user && this.user.role === Role.USER_ROLE;
    }

    logout() {
        this.authenticationService.logout();
    }
}
