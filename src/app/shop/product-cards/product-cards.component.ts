import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../ProductModel";
import {HttpService} from "../../http.service";
import {ShopService} from "../shop.service";
import {FilterTagModel} from "../search-filters/search-filter-group/filterTag.model";

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {
  products : ProductModel[] = [];

  constructor(private http : ShopService) {
    this.getProductsFromService();
  }

  ngOnInit(): void {
  }

  getProductsFromService() : void {
    this.http.getProducts((data) => {
      this.products = data;
      console.log(data);
    });
  }

  toggleTag(tag : FilterTagModel) {
    this.http.toggleTag(tag);
  }

}
