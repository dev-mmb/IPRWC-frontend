import {FilterGroupModel} from "./filterGroup.model";

export class FilterTagModel {
  name : string;
  filterGroup : FilterGroupModel;

  constructor() {
    this.name = "";
    this.filterGroup = new FilterGroupModel();
  }
}
