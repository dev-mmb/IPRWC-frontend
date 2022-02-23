import { Injectable } from '@angular/core';
import {DecodedJwtModel} from "./decoded-jwt.model";
import {HttpService} from "./http.service";
import {ProductModel} from "../app/shop/ProductModel";
import {OrderModel} from "../app/shopping-cart/shopping-cart-list/order-popup/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http : HttpService) { }

  async convertToOrder() {
    return await this.http.post("/order", "null");
  }
  async getOrders() : Promise<OrderModel[]> {
    return await this.http.getWithToken("/order");
  }
  async deleteOrder(order : OrderModel) : Promise<String> {
    return await this.http.delete<OrderModel, string>("/order", order);
  }
}
