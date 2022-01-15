import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../../shopping-cart/shopping-cart-list/order-popup/order.model";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input()
  order : OrderModel = new OrderModel();

  constructor() { }

  ngOnInit(): void {
  }

  getOrderTotalPrice() : string{
    let price = 0;
    for (let i = 0; i < this.order.shoppingCartProducts.length; i++) {
      price += (this.order.shoppingCartProducts[i].amount * this.order.shoppingCartProducts[i].product.price);
    }
    return price.toFixed(2);
  }

  onDeleteOrder() {

  }
}
