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
    let p = {product: new ProductModel(), amount: 4};
    p.product.name = "Houten Tafel";
    p.product.specs = "tafel, hout";
    p.product.price = 200.99;
    p.product.description = "Een van de beste tafels die je kan kopen. Alleen de metalen tafel is beter.";
    p.product.image = "tafel.jpg"
    this.shoppingCart.products.push(p);
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
        this.addToCart(product);
      });
    }
    else {
      this.addToCart(product);
    }
  }

  getCart() : ShoppingCartModel {
    return this.shoppingCart;
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

    this._onShoppingCartChanged.emit(this.shoppingCart);
  }

  private openCart() {
    this.router.navigate(["shopping-cart-component"]).then();
  }

  public onShoppingCartChanged(event : (cart : ShoppingCartModel) => void) : Subscription {
    return this._onShoppingCartChanged.subscribe(event);
  }

  public updateProductAmount(product : ProductModel, amount : number) {
    for (let i = 0; i < this.shoppingCart.products.length; i++) {
      if (this.shoppingCart.products[i].product.name === product.name) {
        this.shoppingCart.products[i].amount = amount;
        return;
      }
    }
  }
}
