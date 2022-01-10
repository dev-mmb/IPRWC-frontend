import { Injectable } from '@angular/core';
import {ShoppingCartModel} from "../app/shopping-cart/shopping-cart.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  convertToOrder(cart : ShoppingCartModel) {

  }
}
