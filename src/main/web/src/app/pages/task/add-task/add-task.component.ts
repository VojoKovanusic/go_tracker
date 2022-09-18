import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {TaskService} from "../../../services/TaskService";
import {AuthenticationService} from "../../../auth/AuthenticationService";
import {Component, OnInit} from "@angular/core";
import {Status, Task, User, UserResponse} from "../../..//models/models";
import {UserService} from "../../../services/UserService";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  registerForm: FormGroup
  submitted: boolean
  error = ''
  loading: boolean
  users: UserResponse[]

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private taskService: TaskService, private router: Router, private userService: UserService, private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getAllAll().then(u => {
      console.log(this.users = u)
    })
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      username: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log("Submitt")
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
    return task;
  }

  back() {
    this.location.back();
  }

  async getAllAll() {
    return await this.userService.getAllUserResponse().toPromise()
  }

}

