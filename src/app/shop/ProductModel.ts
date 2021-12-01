import {ProductInterface} from "./Product.interface";

export class ProductModel implements ProductInterface {
  description: string;
  filterTags: string[];
  id: string;
  image: string;
  name: string;
  price: number;
  specs: string;

  constructor(name : string) {
    this.description = "";
    this.filterTags = [];
    this.id = "";
    this.image = "";
    this.name = name;
    this.price = 0;
    this.specs = "";
  }


}
