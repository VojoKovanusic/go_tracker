import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {first} from "rxjs/operators";
import {Status, User, UserResponse} from "../../../models/models";
import {AuthenticationService} from "../../../auth/AuthenticationService";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../models/models";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.less']
})
export class EditTaskComponent implements OnInit {
  registerForm: FormGroup
  taskId = this.activation.snapshot.params.id
  submitted: boolean
  error = ''
  loading: boolean
  user: User;
  users: UserResponse[]
  statusi = ["IN_PROGRESS", "FINISHED", "CREATED"];

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private service: TaskService, private router: Router,
              private activation: ActivatedRoute, private location: Location, private userService: UserService
  ) {
    this.authService.user.subscribe(u => this.user = u)
  }

  ngOnInit(): void {
    this.getAllAll().then(users => {
      this.users = users
    })
    this.registerForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      username: ['', Validators.required],
      status: ['', Validators.required]
    })

    this.service.getById(this.taskId).subscribe(
      task => {
        console.log("task", task)
        this.registerForm.setValue(task);
      }
    )
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    } else {
      this.service.edit(this.getTaskFromForm()).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.router.navigate(['tasks']);
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

  private getTaskFromForm() {
    let task: Task = new class implements Task {
      username: string;
      description: string;
      id: number;
      title: string;
      status: Status
    }

    task.title = this.form.title.value
    task.username = this.form.username.value
    task.description = this.form.description.value
    task.id = this.taskId
    task.status = this.form.status.value
    return task;
  }

  back() {
    this.location.back();

  }

  async getAllAll() {
    return await this.userService.getAllUserResponse().toPromise()
  }

}
