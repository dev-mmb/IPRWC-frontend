import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPRWC-frontend';
  shouldShowErrorBanner = false;
  constructor(private http : HttpService) {
    this.http.onErrorEvent.subscribe(() => {
      this.shouldShowErrorBanner = true;
    });
    this.http.onSuccesfulRequestEvent.subscribe(() => {
      this.shouldShowErrorBanner = false;
    });
  }
}
