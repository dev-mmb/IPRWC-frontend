import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../shop/ProductModel";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart-list-item',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.scss']
})
export class ShoppingCartListItemComponent implements OnInit {
  @Input() product : {product: ProductModel, amount: number} = {product: new ProductModel(), amount: 0}

  constructor(private shoppingCartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  getProductAmountArray() : number[] {
    let ar = Array.from(Array(10).keys());
    ar.shift();
    return ar;
  }

  getProductPrice() : number {
    return this.product.product.price * this.product.amount;
  }

  onSelectProductAmount(event : any) {
    this.product.amount = parseInt(event.target.value);
    this.shoppingCartService.updateProductAmount(this.product.product, this.product.amount);
  }

  onDelete() {
    this.shoppingCartService.deleteFromShoppingCart(this.product.product);
  }
}
