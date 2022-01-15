import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountOptions} from "./account-options/account-options.model";
import {OrderModel} from "../shopping-cart/shopping-cart-list/order-popup/order.model";
import {AccountOptionsComponent} from "./account-options/account-options.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  selectedOption : AccountOptions = AccountOptions.OVERZICHT;
  @ViewChild(AccountOptionsComponent) options : any;

  constructor() { }

  ngOnInit(): void {
  }

  onOptionSelect(option : AccountOptions) {
    this.selectedOption = option;
  }

  onOrderClicked(order : OrderModel) {
    this.selectedOption = AccountOptions.BESTELLINGEN;
    this.options.selectedOption = AccountOptions.BESTELLINGEN;
  }

}
