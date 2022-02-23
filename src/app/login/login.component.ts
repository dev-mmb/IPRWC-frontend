import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../../services/login.service";
import {CreateAccountComponent} from "./create-account/create-account.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public shouldShowError = false;
  private username : string = "";
  private password : string = "";

  constructor(public activeModal : NgbActiveModal, private modalService : NgbModal, private login : LoginService) { }

  ngOnInit(): void {
  }

  onKeyUsername(event : any) {
    this.shouldShowError = false;
    this.username = event.target.value;
  }

  onKeyPassword(event : any) {
    this.shouldShowError = false;
    this.password = event.target.value;
  }

  onLoginButtonClicked() {
    this.login.login(this.username, this.password, () => {
      this.onLoginSuccess()
    },() => {
      this.onLoginFailed()
    });
  }

  onLoginSuccess() {
    this.activeModal.close();
  }

  onLoginFailed() {
    this.shouldShowError = true;
  }

  onCreateAccount() {
    this.modalService.open(CreateAccountComponent);
  }


}
