import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home';
import {UserPageComponent} from "@app/components/user/user-page/user-page.component";
import {AddUserComponent} from "@app/components/user/add-user/add-user.component";
import {Role} from "@app/_models/role";
import {LoginComponent} from "@app/pages/login/login.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {EditUserComponent} from "@app/components/user/edit-user/edit-user.component";
import {TaskListComponent} from "@app/components/task/task-list/task-list.component";
import {AddTaskComponent} from "@app/components/task/add-task/add-task.component";
import {EditTaskComponent} from "@app/components/task/edit-task/edit-task.component";

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE, Role.USER_ROLE]}
  },
  {
    path: 'users',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'addUser',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'editUser/:username',
    component: EditUserComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE, Role.USER_ROLE]}
  },
  {
    path: 'addTask',
    component: AddTaskComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'editTask/:id',
    component: EditTaskComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
