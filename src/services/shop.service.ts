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

  async getProducts() : Promise<ProductModel[]> {
    let map : {key: string, value: string}[] = [];

    if (this.tags.length !== 0) {
      let dataString = "";

      for (let tag of this.tags) {
        dataString += tag.name + ",";
      }

      // remove last comma
      dataString = dataString.substr(0, dataString.length - 1);
      map.push({key: "tags", value: dataString});
    }

    if (this.searchedName !== "") {
      map.push({key: "name", value: this.searchedName});
    }

    return await this.http.get<ProductModel[]>("/product", map);
  }

  async changeProduct(product : ProductModel) : Promise<ProductModel> {
    return await this.http.put<ProductModel>("/product", product);
  }

  async createProduct(product : ProductModel) : Promise<ProductModel[]> {
    return await this.http.post("/product", [product]);
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
