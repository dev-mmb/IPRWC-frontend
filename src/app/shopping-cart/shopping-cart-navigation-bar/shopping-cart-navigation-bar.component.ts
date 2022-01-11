import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ShopService} from "../../../services/shop.service";

@Component({
  selector: 'app-shopping-cart-navigation-bar',
  templateUrl: './shopping-cart-navigation-bar.component.html',
  styleUrls: ['./shopping-cart-navigation-bar.component.scss',
    '../../shop/navigation-bar/navigation-bar.component.scss']
})
export class ShoppingCartNavigationBarComponent implements OnInit {
  shouldUseMobileLayout: boolean = false;

  constructor(private router : Router, private shopService : ShopService) { }

  ngOnInit(): void {
  }

  onSearch(data : string) {
    this.router.navigate([""]).then((d) => {
      this.shopService.setSearchName(data);
    });
  }

}
