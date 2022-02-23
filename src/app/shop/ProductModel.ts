import {FilterTagModel} from "./search-filters/search-filter-group/filterTag.model";

export class ProductModel {
  description: string;
  filterTags: FilterTagModel[];
  id: string;
  image: string;
  name: string;
  price: number;
  specs: string;

  constructor() {
    this.description = "";
    this.filterTags = [];
    this.id = "";
    this.image = "";
    this.name = "";
    this.price = 0;
    this.specs = "";
  }

}
