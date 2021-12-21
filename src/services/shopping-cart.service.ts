import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {LoginService} from "./login.service";
import {ProductModel} from "../app/shop/ProductModel";
import {Router} from "@angular/router";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _onShoppingCartChanged = new SimpleEventDispatcher<ProductModel[]>();
  private tempShoppingCart : ProductModel[] = [];

  constructor(private http : HttpService, private login : LoginService, private router : Router) { }

  openCartAndLogin() {
    if (!this.login.isLoggedIn()) {
      this.login.openLoginPopup(() => {
        this.openCart();
      });
    }
    else {
      this.openCart();
    }
  }

  addToCartAndLogin(product : ProductModel) {
    if (!this.login.isLoggedIn()) {
      this.login.openLoginPopup(() => {
        this.addToCart(product);
      });
    }
    else {
      this.addToCart(product);
    }
  }

  private addToCart(model : ProductModel) {
    this.tempShoppingCart.push(model);
    this._onShoppingCartChanged.dispatch(this.tempShoppingCart);
  }

  private openCart() {
    this.router.navigate(["shopping-cart-component"]).then();
  }

  public get onShoppingCartChanged() : ISimpleEvent<ProductModel[]> {
    return this._onShoppingCartChanged.asEvent();
  }
}
