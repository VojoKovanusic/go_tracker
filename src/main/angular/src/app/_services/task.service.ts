import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {Task} from "../../generated/model";

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/task/${id}`);
  }

  add(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/task`, task)
  }

  delete(task: Task): Observable<Task> {
    console.log("task", task)
    return this.http.delete<Task>(`${environment.apiUrl}/task/` + task.id)
  }

  edit(task: Task) : Observable<Task>{
    return this.http.put<Task>(`${environment.apiUrl}/task`, task)
  }

}

