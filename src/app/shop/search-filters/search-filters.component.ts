import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
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
  shouldUseMobileLayout = false;

  constructor(private http : HttpService, private cdr: ChangeDetectorRef) {
    this.filters = [];
    http.get<FilterGroupModel[]>("/filter_group", []).then((data) => {
      this.filters = data;
    });
  }

  ngOnInit(): void {
    this.onResize(null);
  }

  onTagSelected(tag : FilterTagModel) {
    this.onSelectEvent.emit(tag);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.shouldUseMobileLayout = (document.getElementsByTagName("html")[0].offsetWidth <= 991);
    this.cdr.detectChanges();
  }


}
