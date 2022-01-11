import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {LoginService} from "./login.service";
import {ProductModel} from "../app/shop/ProductModel";
import {Router} from "@angular/router";
import {ShoppingCartModel} from "../app/shopping-cart/shopping-cart.model";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _onShoppingCartChanged = new EventEmitter<ShoppingCartModel>();
  private shoppingCart : ShoppingCartModel = new ShoppingCartModel();

  constructor(private http : HttpService, private login : LoginService, private router : Router) {
  }

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
        this.getShoppingCart((data) => {
          this.shoppingCart = data;
          this.addToCart(product);
        });
      });
    }
    else {
      this.addToCart(product);
    }
  }

  getCart(callback : (data: ShoppingCartModel) => void)  {
    if (this.login.isLoggedIn())
      this.getShoppingCart((data) => {
        this.shoppingCart = data;
        callback(data);
      });
  }

  private addToCart(model : ProductModel) {
    let found = false;
    for (let i = 0; i < this.shoppingCart.products.length; i++) {
      if (this.shoppingCart.products[i].product.name === model.name) {
        this.shoppingCart.products[i].amount++;
        found = true;
      }
    }
    if (!found) {
      this.shoppingCart.products.push({product: model, amount: 1});
    }
    this.setShoppingCart(this.shoppingCart, () => {});
    this._onShoppingCartChanged.emit(this.shoppingCart);
  }

  private openCart() {
    this.router.navigate(["shopping-cart-component"]).then();
  }

  public onShoppingCartChanged(event : (cart : ShoppingCartModel) => void) : Subscription {
    return this._onShoppingCartChanged.subscribe(event);
  }

  public deleteFromShoppingCart(product : ProductModel) {
    for (let i = 0; i < this.shoppingCart.products.length; i++) {
      if (this.shoppingCart.products[i].product.id === product.id) {
        this.shoppingCart.products.splice(i, 1);
        this.setShoppingCart(this.shoppingCart, () => {});
      }
    }
  }

  public updateProductAmount(product : ProductModel, amount : number) {
    for (let i = 0; i < this.shoppingCart.products.length; i++) {
      if (this.shoppingCart.products[i].product.name === product.name) {
        this.shoppingCart.products[i].amount = amount;
        this.setShoppingCart(this.shoppingCart, () => {});
        return;
      }
    }
  }

  private getShoppingCart(callback : (cart : ShoppingCartModel) => void) {
    this.http.get<ShoppingCartModel>("/cart", new Map<string, string>(), callback);
  }

  private setShoppingCart(cart : ShoppingCartModel, callback : (cart : ShoppingCartModel) => void) {
    this.http.post<ShoppingCartModel>("/cart", cart, callback, () => {});
  }
}
