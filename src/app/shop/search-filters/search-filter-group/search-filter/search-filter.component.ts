import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterTagModel} from "../filterTag.model";
import {ShopService} from "../../../../../services/shop.service";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output() onSelectEvent = new EventEmitter();
  @Input() tag : FilterTagModel;

  constructor() {
    this.tag = new FilterTagModel();
  }

  ngOnInit(): void {
  }

  onChanged() {
    this.onSelectEvent.emit(this.tag);
  }
}
