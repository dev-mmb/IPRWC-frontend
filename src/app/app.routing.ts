import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopComponent} from "./shop/shop.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {AccountComponent} from "./account/account.component";

const routes : Routes = [
  {path: "", redirectTo: "shop-component", pathMatch: "full"},
  {path: "shop-component", component: ShopComponent},
  {path: "shopping-cart-component", component: ShoppingCartComponent},
  {path: "account-component", component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {


}


