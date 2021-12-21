import {ApplicationRef, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {ProductModel} from "../ProductModel";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Output() onSearchEvent = new EventEmitter();
  shoppingCartSizeString : string;

  constructor(private shoppingCart : ShoppingCartService) {
    shoppingCart.onShoppingCartChanged.subscribe(this.onShoppingCartChanged.bind(this));
    this.shoppingCartSizeString = "0";
  }

  ngOnInit(): void {
  }

  onSearch(value : string) {
    this.onSearchEvent.emit(value);
  }

  onOpenShoppingCart() {
    this.shoppingCart.openCartAndLogin();
  }

  onShoppingCartChanged(cart : ProductModel[]) {
    if (cart.length > 9) {
      this.shoppingCartSizeString = "9+";
    }
    else {
      this.shoppingCartSizeString = cart.length + "";
    }
  }

  shouldShowShoppingCartSize() : boolean {
    return this.shoppingCartSizeString !== "0";
  }

}
