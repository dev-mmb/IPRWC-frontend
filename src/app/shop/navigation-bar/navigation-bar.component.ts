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
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

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
  isLoggedIn = false;

  constructor(private shoppingCart : ShoppingCartService, private login : LoginService, private router : Router) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingCart.onShoppingCartChanged(this.onShoppingCartChanged.bind(this));
    this.login.isLoggedIn(() => {
      this.isLoggedIn = true;
    }, () => {
      this.isLoggedIn = false;
    });
    this.shoppingCart.getCart((data) => {
      this.onShoppingCartChanged(data);
      // call immediately to update card on route change
      this.onResize(null);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSearch(value : string) {
    this.onSearchEvent.emit(value);
  }

  onLogin() {
    this.login.openLoginPopup(() => {
      this.isLoggedIn = true;
    });
  }
  onOpenAccountPage() {
    this.router.navigate(["account-component"]);
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
