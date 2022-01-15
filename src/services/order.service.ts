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

  convertToOrder(onSuccess : () => void, onFailure : () => void) {
    this.http.post("/order", "null", onSuccess, onFailure);
  }
  getOrders(onSuccess : (orders : OrderModel[]) => void, onFailure : () => void) {
    this.http.get("/order", new Map<string, string>(), onSuccess, onFailure);
  }
}
