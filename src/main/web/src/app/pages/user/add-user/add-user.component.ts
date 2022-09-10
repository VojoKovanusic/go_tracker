import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {User} from "../../../models/models";
import {AuthenticationService} from "../../../auth/AuthenticationService";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {
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
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
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
        this.router.navigate(['/users']))
    }
  }

  get form() {
    return this.registerForm.controls
  }

  private getUserFromForm() {

    let user: User = ({
      username: this.form.username.value,
      role:this.form.role.value,
      password: this.form.password.value,
      firstName: this.form.firstName.value,
      lastName:this.form.lastName.value,
      token:null,
      id:null,
      admin: null,
      enabled:null
    })
    return user
  }

  back() {
    this.location.back();

  }
}

