import {ApplicationRef, ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
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
  shouldUseMobileLayout = false;

  constructor(private shoppingCart : ShoppingCartService) {
    shoppingCart.onShoppingCartChanged(this.onShoppingCartChanged.bind(this));
    this.shoppingCartSizeString = "0";
  }

  ngOnInit(): void {
    this.onResize(null);
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

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.shouldUseMobileLayout = (window.screen.width <= 991);
  }
}
