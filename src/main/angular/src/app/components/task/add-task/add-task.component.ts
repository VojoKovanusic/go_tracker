import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/_services/authentication.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import {TaskService} from "@app/_services/task.service";
import {Task} from "../../../../generated/model";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.less']
})
export class AddTaskComponent implements OnInit {
  registerForm: FormGroup
  submitted: boolean
  error = ''
  loading: boolean

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private taskService: TaskService, private router: Router, private location: Location
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
      this.taskService.add(this.getTaskFromForm()).subscribe(() =>
        this.router.navigate(['/tasks']))
    }
  }

  get form() {
    return this.registerForm.controls
  }

  private getTaskFromForm() {
    let task: Task= new class implements Task {
      carType: string;
      description: string;
      id: number;
      price: number;
      title: string;
    }

    task.price = this.form.price.value
    task.title = this.form.title.value
    task.carType = this.form.carType.value
    task.description = this.form.description.value
    return task;
  }

  back() {
    this.location.back();
  }
}
