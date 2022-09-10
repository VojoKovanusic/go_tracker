import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../../auth/AuthenticationService";
import {User} from "../../../models/models";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent implements OnInit {
  registerForm: FormGroup
  submitted: boolean
  error = ''
  loggedUser = this.authService.userValue.username
  username = this.activation.snapshot.params.username
  userId;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private userService: UserService, private router: Router,
              private activation: ActivatedRoute, private location: Location
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [], token: [], enabled: [], admin: [],
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })

    this.userService.getByUsername(this.username).subscribe(
      user => {
        this.userId = user.id
        this.registerForm.setValue(user);
        console.log("USER____>", user)
      }
    )
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    } else {
      this.userService.edit(this.getUserFromForm()).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.router.navigate(['users']);
            } else {
              alert("error neki");
            }
          },
          error => {
            alert(error);
          });
    }
  }

  get form() {
    return this.registerForm.controls
  }

  private getUserFromForm(): User {
    let user = new User();
    user.username = this.form.username.value;
    user.password = this.form.password.value;
    user.firstName = this.form.firstName.value;
    user.lastName = this.form.lastName.value;
    user.role = this.form.role.value;
    user.id = this.userId

    return user;
  }

  back() {
    this.location.back();

  }
}

