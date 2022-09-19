import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task, User} from "../../../models/models";
import {AuthenticationService} from "../../../auth/AuthenticationService";
import {TaskService} from "../../../services/TaskService";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {


  taskId = this.activation.snapshot.params.id
  task: Task = null;
  user: User;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private service: TaskService, private router: Router,
              private activation: ActivatedRoute, private location: Location
  ) {
    this.authService.user.subscribe(u => this.user = u)
  }

  ngOnInit(): void {
    this.service.getById(this.taskId).subscribe(
      task => {
        this.task = task;
      }
    )
  }


  back() {
    this.location.back();

  }

}

