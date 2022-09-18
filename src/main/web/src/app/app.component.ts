import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GO_PACK_MANAGER';
  c;

  logChange() {
    console.log("sdf")
  }
}
