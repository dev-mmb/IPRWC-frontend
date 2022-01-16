import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {ProductModel} from "../app/shop/ProductModel";
import {FilterTagModel} from "../app/shop/search-filters/search-filter-group/filterTag.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private tags : FilterTagModel[];
  private searchedName : string;

  constructor(private http : HttpService) {
    this.tags = [];
    this.searchedName = "";
  }

  getProducts(implementation : (data : ProductModel[]) => void) : void {
    let map = new Map<string, string>();

    if (this.tags.length !== 0) {
      let dataString = "";

      for (let tag of this.tags) {
        dataString += tag.name + ",";
      }

      // remove last comma
      dataString = dataString.substr(0, dataString.length - 1);
      map.set("tags", dataString);
    }

    if (this.searchedName !== "") {
      map.set("name", this.searchedName);
    }

    this.http.get<ProductModel[]>("/product", map, implementation);
  }

  changeProduct(product : ProductModel, onSuccess : (p : ProductModel) => void, onFailure : () => void) {
    this.http.put("/product", product, onSuccess, onFailure);
  }

  createProduct(product : ProductModel, onSuccess : (p : ProductModel[]) => void, onFailure : () => void) {
    this.http.post("/product", [product], onSuccess, onFailure);
  }

  toggleTag(tag : FilterTagModel) {
    if (this.tags.includes(tag)) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
    else {
      this.tags.push(tag);
    }
  }

  turnOffAllTags() {
    this.tags = [];
  }
  setSearchName(name : string) {
    this.searchedName = name;
  }

  getSearchName() : string {
    return this.searchedName;
  }
}
