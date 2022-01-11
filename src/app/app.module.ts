import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { SearchFiltersComponent } from './shop/search-filters/search-filters.component';
import { ProductCardsComponent } from './shop/product-cards/product-cards.component';
import { NavigationBarComponent } from './shop/navigation-bar/navigation-bar.component';
import { SearchBarComponent } from './shop/navigation-bar/search-bar/search-bar.component';
import { LogoComponent } from './shop/navigation-bar/logo/logo.component';
import { ProductCardComponent } from './shop/product-cards/product-card/product-card.component';
import { SearchFilterGroupComponent } from './shop/search-filters/search-filter-group/search-filter-group.component';
import { SearchFilterComponent } from './shop/search-filters/search-filter-group/search-filter/search-filter.component';
import {AppRouting} from "./app.routing";
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartListItemComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list-item/shopping-cart-list-item.component';
import { ShoppingCartNavigationBarComponent } from './shopping-cart/shopping-cart-navigation-bar/shopping-cart-navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    SearchFiltersComponent,
    ProductCardsComponent,
    NavigationBarComponent,
    SearchBarComponent,
    LogoComponent,
    ProductCardComponent,
    SearchFilterGroupComponent,
    SearchFilterComponent,
    LoginComponent,
    ShoppingCartComponent,
    CreateAccountComponent,
    ShoppingCartListComponent,
    ShoppingCartListItemComponent,
    ShoppingCartNavigationBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
