import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AccountOptions} from "../account-options/account-options.model";
import {OrderModel} from "../../shopping-cart/shopping-cart-list/order-popup/order.model";
import {AccountOrdersComponent} from "./account-orders/account-orders.component";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-account-content',
  templateUrl: './account-content.component.html',
  styleUrls: ['./account-content.component.scss']
})
export class AccountContentComponent implements OnInit {
  @Input()
  selectedOption : AccountOptions = AccountOptions.OVERZICHT;
  @Output()
  orderClicked : EventEmitter<OrderModel> = new EventEmitter<OrderModel>();

  orderToScrollTo : OrderModel | null = null;

  constructor() { }

  ngOnInit(): void {

  }

  getOverzichtOption() {
    return AccountOptions.OVERZICHT;
  }
  getBestellingenOption() {
    return AccountOptions.BESTELLINGEN;
  }
  getAdminOption() {
    return AccountOptions.ADMIN;
  }

  onOrderClicked(order : OrderModel) {
    this.orderToScrollTo = order;
    this.orderClicked.emit(order);
  }
}
