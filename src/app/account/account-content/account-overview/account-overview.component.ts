import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from "../../../../services/login.service";
import {AccountDetailsModel} from "../../account-details.model";
import {OrderService} from "../../../../services/order.service";
import {OrderModel} from "../../../shopping-cart/shopping-cart-list/order-popup/order.model";

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {
  account : AccountDetailsModel = new AccountDetailsModel();
  orders : OrderModel[] = [];
  @Output()
  orderClicked : EventEmitter<OrderModel> = new EventEmitter<OrderModel>();

  constructor(private loginService : LoginService, private orderService : OrderService) { }

  ngOnInit(): void {
    this.loginService.getAccountDetails((account) => {
      this.account = account;
    }, () => {
      this.account.email = "Account niet gevonden";
    });
    this.orderService.getOrders((orders) => {
      this.orders = orders;
    }, () => {});
  }

  onOrderClicked(order : OrderModel) {
    this.orderClicked.emit(order);
  }

}
