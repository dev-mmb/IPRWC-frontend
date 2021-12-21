import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username : string = "";
  private password : string = "";

  constructor(public activeModal : NgbActiveModal, private login : LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  onKeyUsername(event : any) {
    this.username = event.target.value;
  }
  onKeyPassword(event : any) {
    this.password = event.target.value;
  }
  onLoginButtonClicked() {
    this.login.login(this.password, this.username);
    this.activeModal.close();
  }

}
