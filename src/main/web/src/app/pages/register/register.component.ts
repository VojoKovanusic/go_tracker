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
  errorMsg = null;
  loading: boolean
  user: User;
  msisdn: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private userService: UserService, private router: Router, private location: Location
  ) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user)
    if (this.user != null) {
      this.router.navigate(['/tasks'])
    }
    this.registerForm = this.formBuilder.group({
      msisdn: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    } else {
      this.userService.sendSms(this.getMsisdnFromForm())
        .subscribe(() =>
            this.router.navigate(['/login']),
          error => this.errorMsg = error)
    }
  }

  get form() {
    return this.registerForm.controls
  }

  private getMsisdnFromForm() {
    return this.form.msisdn.value;

  }

  back() {
    this.location.back();

  }

  isErrorOccurred() {
    if (this.errorMsg != null) {
      return true;
    }
    return false;
  }
}
