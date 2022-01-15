import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../../shopping-cart/shopping-cart-list/order-popup/order.model";

@Component({
  selector: 'app-order-preview-card',
  templateUrl: './order-preview-card.component.html',
  styleUrls: ['./order-preview-card.component.scss']
})
export class OrderPreviewCardComponent implements OnInit {
  @Input()
  order : OrderModel;
  constructor() {
    this.order = new OrderModel();
  }

  ngOnInit(): void {
  }

  getTotalOrderPrice() : string {
    let price = 0;
    for (let i = 0; i < this.order.shoppingCartProducts.length; i++) {
      price += (this.order.shoppingCartProducts[i].amount * this.order.shoppingCartProducts[i].product.price);
    }
    return price.toFixed(2);
  }

  getProductImage() : string {
    if (this.order.shoppingCartProducts.length > 0) {
      return this.order.shoppingCartProducts[0].product.image;
    }
    return "NONE.png";
  }

}
