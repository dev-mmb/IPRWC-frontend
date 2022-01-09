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
  private token : string = "";

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

  login(username : string, password : string, onSuccess : () => void, onFailure : () => void) {
    this.http.postWithReturnType<{username : string, password : string}, string>(
      "/account/authenticate",
      {username: username, password: password},
      (token) => {
        this.handleLoginResult(token);
        this.loggedIn = true;
        onSuccess();
        this.onSuccess();
      },
      onFailure
    );
  }

  createAccount(username : string, password : string, onSuccess : () => void, onFailure : () => void) {
    this.http.post<{email : string, password : string}>(
      "/account/create",
      {email: username, password: password},
      onSuccess,
      onFailure
    );
  }

  private handleLoginResult(token : string) {
    this.token = token;
  }
}
