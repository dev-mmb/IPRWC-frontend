import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountOptions} from "./account-options/account-options.model";
import {OrderModel} from "../shopping-cart/shopping-cart-list/order-popup/order.model";
import {AccountOptionsComponent} from "./account-options/account-options.component";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  selectedOption : AccountOptions = AccountOptions.OVERZICHT;
  @ViewChild(AccountOptionsComponent) options : any;

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn(() => {}, () => {
      this.router.navigate([""]);
    });
  }

  onOptionSelect(option : AccountOptions) {
    if (option !== AccountOptions.LOGOUT) {
      this.selectedOption = option;
    }
    else {
      this.loginService.logout();
    }
  }

  onOrderClicked(order : OrderModel) {
    this.selectedOption = AccountOptions.BESTELLINGEN;
    this.options.selectedOption = AccountOptions.BESTELLINGEN;
  }

}
