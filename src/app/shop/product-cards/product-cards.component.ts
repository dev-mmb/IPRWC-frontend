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
  dataHasLoaded = false;

  constructor(private http : ShopService) {
  }

  ngOnInit(): void {
    this.http.turnOffAllTags();
    this.getProductsFromService();
  }

  getProductsFromService() {
    this.http.getProducts().then((data) => {
      this.products = data;
      this.dataHasLoaded = true;
    });
  }

  toggleTag(tag : FilterTagModel) {
    this.http.toggleTag(tag);
  }

  setSearchName(name : string) {
    this.http.setSearchName(name);
  }

}
