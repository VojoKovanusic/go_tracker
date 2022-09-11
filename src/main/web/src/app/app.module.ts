import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {QuillConfigModule, QuillModule} from 'ngx-quill';
import {MatSliderModule} from '@angular/material/slider';
import {AppComponent} from './app.component';
import {AddTaskComponent} from './pages/task/add-task/add-task.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./routing/AppRoutingModule";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./auth/error.interceptor";
import {JwtInterceptor} from "./auth/jwt.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {StatisticsComponent} from './pages/stats/statistics/statistics.component';
import {FooterComponent} from './pages/footer/footer.component';
import {NavbarComponent} from './pages/navbar/navbar.component';
import {LoginComponent} from "./pages/login/login.component";
import {UserPageComponent} from "./pages/user/user-page/user-page.component";
import {EditUserComponent} from "./pages/user/edit-user/edit-user.component";
import {AddUserComponent} from "./pages/user/add-user/add-user.component";
import {AllTasksComponent} from './pages/task/all-tasks/all-tasks/all-tasks.component';
import {EditTaskComponent} from "./pages/task/edit-task/edit-task.component";
import {MatIconModule} from "@angular/material/icon";
import {DetailsTaskComponent} from './pages/task/details-task/details-task.component';

let toolbar = [

  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],

  ['clean'],                                         // remove formatting button

  ['link', 'image', 'video']                         // link and image, video
];

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    UserPageComponent,
    EditUserComponent,
    AddUserComponent,
    FooterComponent,
    AllTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    NavbarComponent,
    DetailsTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    QuillModule,
    QuillConfigModule.forRoot({
      modules: {
        syntax: false,
        toolbar: toolbar
      }
    }),
    MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
