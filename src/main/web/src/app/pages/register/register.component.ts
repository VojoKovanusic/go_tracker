import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth/AuthenticationService";
import {UserService} from "../../services/UserService";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {User} from "../../models/models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  submitted: boolean
  error = ''
  loading: boolean

  // loggedUser = this.authService.userValue.username

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private userService: UserService, private router: Router, private location: Location
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    } else {
      let user = this.getUserFromForm();
      console.log("User", user)
      this.userService.registerUser(user).subscribe(() =>
        this.router.navigate(['']))
    }
  }

  get form() {
    return this.registerForm.controls
  }

  private getUserFromForm() {

    let user: User = ({
      username: this.form.username.value,
      role: null,
      password: null,
      firstName: null,
      lastName: null,
      token: null,
      id: null,
      admin: null,
      enabled: null
    })
    return user
  }

  back() {
    this.location.back();

  }
}
