import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from "rxjs";
import {User, UserResponse} from "../models/models";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getAllUserResponse() {
    return this.http.get<UserResponse[]>(`${environment.apiUrl}/users-response`);
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${username}`);
  }

  loginUser(username: string, pass: string): Observable<User> {
    const body = {'username': username, 'password': pass};
    return this.http.post<User>(`${environment.apiUrl}/login`, body)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/add-user`, user)
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/user/` + user.id)
  }

  sendSms(msisdn: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/send-pin`, msisdn)
  }

  edit(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/user/`, user)
  }
}
