import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../ProductModel";
import {Observable} from "rxjs";
import {ProductInterface} from "../Product.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpResponse} from "../../HttpResponse";

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {
  products : ProductModel[] = [];

  constructor(private http : HttpClient) {

    this.http.get<HttpResponse<ProductInterface[]>>("http://localhost:8080/product")
      .subscribe(
      (data: HttpResponse<ProductInterface[]>) => {
        let productData : ProductInterface[] = data.data;
        for (let i = 0; i < productData.length; i++) {
          this.products.push(productData[i]);
        }
      });
  }

  ngOnInit(): void {
  }

}
