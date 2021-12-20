import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterGroupModel} from "./filterGroup.model";
import {FilterTagModel} from "./filterTag.model";
import {HttpService} from "../../../http.service";

@Component({
  selector: 'app-search-filter-group',
  templateUrl: './search-filter-group.component.html',
  styleUrls: ['./search-filter-group.component.css']
})
export class SearchFilterGroupComponent implements OnInit {
  @Output() onSelectEvent = new EventEmitter();
  @Input() filter : FilterGroupModel;
  tags : FilterTagModel[];

  constructor(private http : HttpService) {
    this.filter = new FilterGroupModel();
    this.tags = [];
  }

  ngOnInit() : void {
    let map = new Map<string, string>();
    map.set("group", this.filter.name);
    this.http.get<FilterTagModel[]>("/filter_tag", map, (data) => {
      this.tags = data;
    });
  }

  onTagSelected(tag : FilterTagModel) {
    this.onSelectEvent.emit(tag);
  }

}
