import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterGroupModel} from "./filterGroup.model";
import {FilterTagModel} from "./filterTag.model";
import {HttpService} from "../../../../services/http.service";

@Component({
  selector: 'app-search-filter-group',
  templateUrl: './search-filter-group.component.html',
  styleUrls: ['./search-filter-group.component.scss']
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
    this.http.get<FilterTagModel[]>("/filter_tag", [{key: "group", value: this.filter.name}]).then((data) => {
      this.tags = data;
    });
  }

  onTagSelected(tag : FilterTagModel) {
    this.onSelectEvent.emit(tag);
  }

}
