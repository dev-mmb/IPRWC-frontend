import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPRWC-frontend';
  constructor(private cookieService : CookieService) {
    //this.cookieService.delete("jwt")
  }
}
