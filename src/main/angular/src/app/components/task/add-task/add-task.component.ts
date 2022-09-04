import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/_services/authentication.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Product} from "../../../../generated/model";

import {TaskService} from "@app/_services/task.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.less']
})
export class AddTaskComponent implements OnInit {
  registerForm: FormGroup
  submitted: boolean
  error = ''
  loading: boolean

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private productService: TaskService, private router: Router, private location: Location
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      carType: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    } else {
      this.productService.add(this.getProductFromForm()).subscribe(() =>
        this.router.navigate(['/products']))
    }
  }

  get form() {
    return this.registerForm.controls
  }

  private getProductFromForm() {
    let product: Product= new class implements Product {
      carType: string;
      description: string;
      id: number;
      price: number;
      title: string;
    }

    product.price = this.form.price.value
    product.title = this.form.title.value
    product.carType = this.form.carType.value
    product.description = this.form.description.value
    return product;
  }

  back() {
    this.location.back();
  }
}
