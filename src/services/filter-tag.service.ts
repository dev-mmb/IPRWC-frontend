import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {FilterTagModel} from "../app/shop/search-filters/search-filter-group/filterTag.model";
import {FilterGroupModel} from "../app/shop/search-filters/search-filter-group/filterGroup.model";

@Injectable({
  providedIn: 'root'
})
export class FilterTagService {

  constructor(private http : HttpService) { }

  async getAllTags() : Promise<FilterTagModel[]> {
    return await this.http.get("/filter_tag", []);
  }

  async getAllGroups() : Promise<FilterGroupModel[]> {
    return await this.http.get("/filter_group");
  }

  async createTag(tag : FilterTagModel[]) : Promise<FilterTagModel[]> {
    return await this.http.post("/filter_tag", tag);
  }
}
