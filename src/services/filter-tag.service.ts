import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {FilterTagModel} from "../app/shop/search-filters/search-filter-group/filterTag.model";
import {FilterGroupModel} from "../app/shop/search-filters/search-filter-group/filterGroup.model";

@Injectable({
  providedIn: 'root'
})
export class FilterTagService {

  constructor(private http : HttpService) { }

  getAllTags(onSuccess : (tags : FilterTagModel[]) => void, onFailure : () => void) {
    this.http.get("/filter_tag", new Map<string, string>(), onSuccess, onFailure);
  }

  getAllGroups(onSuccess : (groups : FilterGroupModel[]) => void, onFailure : () => void) {
    this.http.get("/filter_group", new Map<string, string>(), onSuccess, onFailure);
  }

  createTag(tag : FilterTagModel[], onSuccess : (tag: FilterTagModel[]) => void, onFailure : () => void) {
    this.http.post("/filter_tag", tag, onSuccess, onFailure);
  }
}
