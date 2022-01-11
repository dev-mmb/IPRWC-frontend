import { Component, OnInit } from '@angular/core';
import {ShoppingCartModel} from "./shopping-cart.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart : ShoppingCartModel = new ShoppingCartModel();

  constructor(private cartService : ShoppingCartService, private loginService : LoginService) { }

  ngOnInit(): void {
    console.log("getting");
    this.cartService.getCart((data) => {
      this.cart = data;
    });
  }

  onSearch(event : string) {

  }
}
