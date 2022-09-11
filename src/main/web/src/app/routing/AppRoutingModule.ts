import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Role} from "../auth/role";
import {AuthGuard} from "../auth/AuthGuards";
import {AddTaskComponent} from "../pages/task/add-task/add-task.component";
import {AllTasksComponent} from "../pages/task/all-tasks/all-tasks/all-tasks.component";
import {UserPageComponent} from "../pages/user/user-page/user-page.component";
import {AddUserComponent} from "../pages/user/add-user/add-user.component";
import {EditUserComponent} from "../pages/user/edit-user/edit-user.component";
import {EditTaskComponent} from "../pages/task/edit-task/edit-task.component";
import {LoginComponent} from "../pages/login/login.component";
import {StatisticsComponent} from "../pages/stats/statistics/statistics.component";
import {DetailsTaskComponent} from "../pages/task/details-task/details-task.component";


const routes: Routes = [
  {
    path: '',
    component: AllTasksComponent,
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
    component: AllTasksComponent,
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
  },  {
    path: 'detailsTask/:id',
    component: DetailsTaskComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'statistic',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN_ROLE]}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  /* otherwise redirect to home*/
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
