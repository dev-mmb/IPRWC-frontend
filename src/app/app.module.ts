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
import { SearchFilterComponent } from './shop/search-filters/search-filter/search-filter.component';

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
    SearchFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
