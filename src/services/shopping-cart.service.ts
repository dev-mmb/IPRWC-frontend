import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {LoginService} from "./login.service";
import {ProductModel} from "../app/shop/ProductModel";
import {Router} from "@angular/router";
import {ShoppingCartModel} from "../app/shopping-cart/shopping-cart.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _onShoppingCartChanged = new EventEmitter<ShoppingCartModel>();
  private shoppingCart : ShoppingCartModel = new ShoppingCartModel();

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
    this.shoppingCart.products.push(model);
    this._onShoppingCartChanged.emit(this.shoppingCart);
  }

  private openCart() {
    this.router.navigate(["shopping-cart-component"]).then();
  }

  public onShoppingCartChanged(event : (cart : ShoppingCartModel) => void) {
    this._onShoppingCartChanged.subscribe(event);
  }
}
