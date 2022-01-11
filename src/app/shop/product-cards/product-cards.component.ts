import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../ProductModel";
import {ShopService} from "../../../services/shop.service";
import {FilterTagModel} from "../search-filters/search-filter-group/filterTag.model";

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {
  products : ProductModel[] = [];

  constructor(private http : ShopService) {
  }

  ngOnInit(): void {
    this.http.turnOffAllTags();
    this.getProductsFromService();
  }

  getProductsFromService() {
    this.http.getProducts((data) => {
      this.products = data;
    });
  }

  toggleTag(tag : FilterTagModel) {
    this.http.toggleTag(tag);
  }

  setSearchName(name : string) {
    this.http.setSearchName(name);
  }

}
