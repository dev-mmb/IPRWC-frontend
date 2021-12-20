import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopComponent} from "./shop/shop.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";

const routes : Routes = [
  {path: "", redirectTo: "shop-component", pathMatch: "full"},
  {path: "shop-component", component: ShopComponent},
  {path: "login-component", component: LoginComponent},
  {path: "shopping-cart-component", component: ShoppingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {


}


