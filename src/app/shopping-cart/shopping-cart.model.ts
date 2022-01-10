import {ProductModel} from "../shop/ProductModel";

export class ShoppingCartModel {
  id : string;
  products : {product: ProductModel, amount: number}[];

  constructor() {
    this.id = "";
    this.products = [];
  }
}
