import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {LoginComponent} from "../app/login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn : boolean = false;
  private onSuccess : () => void;

  constructor(private http : HttpService, private modalService : NgbModal) {
    this.onSuccess = () => {};
  }

  isLoggedIn() : boolean {
    return this.loggedIn;
  }

  openLoginPopup(onSuccess : () => void) {
    this.onSuccess = onSuccess;
    this.modalService.open(LoginComponent);
  }

  login(username : string, password : string) {
    console.log("logged in with: " + username);
    this.loggedIn = true;
    this.onSuccess();
  }
}
