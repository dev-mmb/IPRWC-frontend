import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {LoginComponent} from "../app/login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CookieService} from "ngx-cookie-service";
import jwt_decode from 'jwt-decode';
import {Md5} from 'ts-md5/dist/md5';
import {AccountDetailsModel} from "../app/account/account-details.model";
import {DecodedJwtModel} from "./decoded-jwt.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private onSuccess : () => void;
  private md5 : Md5 = new Md5();

  constructor(private http : HttpService, private modalService : NgbModal, private cookieService : CookieService, private router : Router) {
    this.onSuccess = () => {};
  }

  isLoggedIn(onTrue : () => void, onFalse : () => void) {
    let jwt = this.cookieService.get("jwt") ;
    if (jwt === "") {
      onFalse();
      return;
    } else {
      this.http.getWithToken("/jwt/validate", new Map<string, string>(), (value : boolean) => {
        if (value) onTrue();
        else onFalse();
      }, onFalse);
    }
  }

  isAdmin() : boolean {
    let jwt : DecodedJwtModel = jwt_decode(this.cookieService.get("jwt"));
    for (let i = 0; i < jwt.roles.length; i++) {
      if (jwt.roles[i].authority === "ADMIN") {
        return true;
      }
    }
    return false;
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
          onSuccess();
          this.onSuccess();
        },
        onFailure
      );
  }
  logout() {
    this.cookieService.delete("jwt");
    this.router.navigate([""]);
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

  getAccountDetails(onSuccess : (account : AccountDetailsModel) => void, onFailure : () => void) {
    let token = this.cookieService.get("jwt");
    if (token === "") onFailure();
    let jwt : DecodedJwtModel = jwt_decode(token);
    let account = new AccountDetailsModel();
    account.email = jwt.sub;
    account.roles = jwt.roles;
    onSuccess(account);
  }

  private handleLoginResult(t : {token: string}) {
    let jwt : DecodedJwtModel = jwt_decode(t.token);
    this.cookieService.set("jwt", t.token, jwt.exp, undefined, undefined, true);
  }
}
