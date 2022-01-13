import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {LoginComponent} from "../app/login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CookieService} from "ngx-cookie-service";
import jwt_decode from 'jwt-decode';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn : boolean = false;
  private onSuccess : () => void;
  private md5 : Md5 = new Md5();

  constructor(private http : HttpService, private modalService : NgbModal, private cookieService : CookieService) {
    this.onSuccess = () => {};
  }

  isLoggedIn() : boolean {
    return this.cookieService.get("jwt") !== "";
  }

  openLoginPopup(onSuccess : () => void) {
    this.onSuccess = onSuccess;
    this.modalService.open(LoginComponent);
  }

  login(username : string, password : string, onSuccess : () => void, onFailure : () => void) {
    let hash : string = Md5.hashStr(password);
    this.http.postWithReturnType<{email : string, password : string}, {token: string}>(
        "/account/authenticate",
        {email: username, password: hash},
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
    let hash : string = Md5.hashStr(password);
    this.http.post<{email : string, password : string}>(
        "/account/create",
        {email: username, password: hash},
        onSuccess,
        onFailure
      );
  }

  private handleLoginResult(t : {token: string}) {
    let jwt : {sub: string, exp: number, iat: number}= jwt_decode(t.token);
    this.cookieService.set("jwt", t.token, jwt.exp, undefined, undefined, true);
  }
}
