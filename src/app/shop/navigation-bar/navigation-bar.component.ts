import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {ProductModel} from "../ProductModel";
import {ShoppingCartModel} from "../../shopping-cart/shopping-cart.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @Output() onSearchEvent = new EventEmitter();
  shoppingCartSizeString : string = "0";
  shouldUseMobileLayout = false;
  subscription : Subscription | null = null;

  constructor(private shoppingCart : ShoppingCartService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingCart.onShoppingCartChanged(this.onShoppingCartChanged.bind(this));
    // call immediately to update card on route change
    this.onShoppingCartChanged(this.shoppingCart.getCart());
    this.onResize(null);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSearch(value : string) {
    this.onSearchEvent.emit(value);
  }

  onOpenShoppingCart() {
    this.shoppingCart.openCartAndLogin();
  }

  onShoppingCartChanged(cart : ShoppingCartModel) {
    let size = this.getShoppingCartSize(cart);
    if (size > 9) {
      this.shoppingCartSizeString = "9+";
    }
    else {
      this.shoppingCartSizeString = size + "";
    }
  }

  shouldShowShoppingCartSize() : boolean {
    return this.shoppingCartSizeString !== "0";
  }

  getShoppingCartSize(shoppingCart : ShoppingCartModel) : number {
    let size : number = 0;
    for (let i = 0; i < shoppingCart.products.length; i++) {
      size += shoppingCart.products[i].amount;
    }
    return size;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.shouldUseMobileLayout = (window.screen.width <= 991);
  }
}
