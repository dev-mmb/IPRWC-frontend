import { Component, OnInit } from '@angular/core';
import {ShoppingCartModel} from "./shopping-cart.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart : ShoppingCartModel = new ShoppingCartModel();

  constructor(private cartService : ShoppingCartService, private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn(() => {
      this.cartService.getCart((data) => {
        this.cart = data;
      });
    }, () => {
      this.router.navigate([""]);
    });

  }
}
