import {ProductModel} from "../../../shop/ProductModel";

export class OrderModel {
  id : string;
  createdAt : string;
  shoppingCartProducts: {product: ProductModel, amount: number}[]
  constructor() {
    this.id = "";
    this.createdAt = "";
    this.shoppingCartProducts = []
  }
}
