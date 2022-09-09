import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './pages/home';
import {UserPageComponent} from './components/user/user-page/user-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AddUserComponent} from './components/user/add-user/add-user.component'
import {NgSelectModule} from "@ng-select/ng-select";
import {LoginComponent} from "@app/pages/login/login.component";
import {JwtInterceptor} from "@app/_helpers/jwt.interceptor";
import {ErrorInterceptor} from "@app/_helpers/error.interceptor";
import {MatSliderModule} from "@angular/material/slider";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HoursPipe} from "@app/_helpers/pipe/HoursPipe";
import {EditUserComponent} from './components/user/edit-user/edit-user.component';
import {EditTaskComponent} from './components/task/edit-task/edit-task.component';
import {TaskListComponent} from "@app/components/task/task-list/task-list.component";;
import { FooterComponent } from './footer/footer.component'
import {AddTaskComponent} from "@app/components/task/add-task/add-task.component";
import { EditorModule } from "@tinymce/tinymce-angular";
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    EditorModule,
    MDBBootstrapModule.forRoot()],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserPageComponent,
    NavbarComponent,
    AddUserComponent,
    HoursPipe,
    EditTaskComponent,
    AddTaskComponent,
    EditUserComponent,
    TaskListComponent,
    FooterComponent

  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
