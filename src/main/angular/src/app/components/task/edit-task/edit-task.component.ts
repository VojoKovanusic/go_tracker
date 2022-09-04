import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {first} from "rxjs/operators";
import {TaskService} from "@app/_services/task.service";
import {Product, User} from "../../../../generated/model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.less']
})
export class EditTaskComponent implements OnInit {
  registerForm: FormGroup
  productId = this.activation.snapshot.params.id
  submitted: boolean
  error = ''
  loading: boolean
  user:User;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private service: TaskService, private router: Router,
              private activation: ActivatedRoute, private location: Location
  ) {
    this.authService.user.subscribe(u=>this.user=u)
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      carType: ['', Validators.required]
    })

    this.service.getById(this.productId).subscribe(
      product => {
        console.log("this.registerForm.setValue(product);", product)
         this.registerForm.setValue(product);
      }
    )
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    } else {
      this.service.edit(this.getProductFromForm()).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.router.navigate(['products']);
            } else {
              alert("Desila se greška!");
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
    product.id = this.productId
    return product;
  }

  back() {
    this.location.back();

  }

  isAdmin() {

  }
}
