﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '@environments/environment';
import {Observable} from "rxjs";
import {User} from "../../generated/model";
@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${username}`);
  }

  loginUser(username: string, pass: string): Observable<User> {
    const body = {'username': username, 'password': pass};
    return this.http.post<User>(`${environment.apiUrl}/login`, body)
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/register`, user)
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/user/`+user.id)
  }

  edit(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/user/`,user)

  }
}
