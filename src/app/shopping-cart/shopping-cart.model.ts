import {ProductModel} from "../shop/ProductModel";

export class ShoppingCartModel {
  id : string;
  products : ProductModel[];

  constructor() {
    this.id = "";
    this.products = [];
  }
}
