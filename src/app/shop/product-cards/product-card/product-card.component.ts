import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../ProductModel";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product : ProductModel;

  constructor() {
    this.product = new ProductModel("none");
  }

  ngOnInit(): void {
  }

}
