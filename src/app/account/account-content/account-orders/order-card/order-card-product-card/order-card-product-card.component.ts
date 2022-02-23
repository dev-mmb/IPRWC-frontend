import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../../shop/ProductModel";
import {HttpService} from "../../../../../../services/http.service";

@Component({
  selector: 'app-order-card-product-card',
  templateUrl: './order-card-product-card.component.html',
  styleUrls: ['./order-card-product-card.component.scss']
})
export class OrderCardProductCardComponent implements OnInit {
  @Input()
  product : {product: ProductModel, amount: number} = {product: new ProductModel(), amount: 0};

  constructor(public http : HttpService) { }

  ngOnInit(): void {
  }

}
