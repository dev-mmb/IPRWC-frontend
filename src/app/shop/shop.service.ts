import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";
import {ProductModel} from "./ProductModel";
import {FilterTagModel} from "./search-filters/search-filter-group/filterTag.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private tags : FilterTagModel[];

  constructor(private http : HttpService) {
    this.tags = [];
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

    this.http.get<ProductModel[]>("/product", map, implementation);
  }

  toggleTag(tag : FilterTagModel) {
    if (this.tags.includes(tag)) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
    else {
      this.tags.push(tag);
    }
  }
}
