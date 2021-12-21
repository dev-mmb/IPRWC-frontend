import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Output() onSearchEvent = new EventEmitter();

  constructor(private shoppingCart : ShoppingCartService) { }

  ngOnInit(): void {
  }

  onSearch(value : string) {
    this.onSearchEvent.emit(value);
  }

  onOpenShoppingCart() {
    this.shoppingCart.openCartAndLogin();
  }
}
