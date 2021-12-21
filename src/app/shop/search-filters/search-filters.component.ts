import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterGroupModel} from "./search-filter-group/filterGroup.model";
import {HttpService} from "../../../services/http.service";
import {FilterTagModel} from "./search-filter-group/filterTag.model";

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Output() onSelectEvent = new EventEmitter();
  filters : FilterGroupModel[];

  constructor(private http : HttpService) {
    this.filters = [];
    http.get<FilterGroupModel[]>("/filter_group", new Map<string, string>(), (data) => {
      this.filters = data;
    });
  }

  ngOnInit(): void {
  }

  onTagSelected(tag : FilterTagModel) {
    this.onSelectEvent.emit(tag);
  }
}