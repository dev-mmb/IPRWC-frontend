import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../http.service";
import {FilterTagModel} from "./search-filters/search-filter-group/filterTag.model";
import {ProductCardsComponent} from "./product-cards/product-cards.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild(ProductCardsComponent) productCards : any;
  constructor() {

  }

  ngOnInit(): void {
  }

  onTagSelected(tag : FilterTagModel) {
    this.productCards.toggleTag(tag);
    this.productCards.getProductsFromService();
  }
}
