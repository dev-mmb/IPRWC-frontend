import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../../../services/login.service";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss', "../login.component.scss"]
})
export class CreateAccountComponent implements OnInit {
  private username : string = "";
  private password : string = "";
  private secondPassword : string = "";

  constructor(public activeModal : NgbActiveModal, private login : LoginService) { }

  ngOnInit(): void {
  }

  onKeyUsername(event : any) {
    this.username = event.target.value;
  }
  onKeyPassword(event : any) {
    this.password = event.target.value;
  }
  onKeySecondPassword(event : any) {
    this.secondPassword = event.target.value;
  }

  onSubmit() {
    let p = this.bcryptPassword(this.password);
    this.login.createAccount(this.username, p, () => {this.onSuccess()}, () => {this.onFailure()});
  }

  onSuccess() {

  }
  onFailure() {

  }

  areBothPasswordsTheSame() : boolean{
    return (this.password === this.secondPassword);
  }
  private bcryptPassword(password : string) : string {
    return bcrypt.hashSync(password);
  }
}
