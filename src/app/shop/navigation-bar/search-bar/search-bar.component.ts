import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShopService} from "../../../../services/shop.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public onKeyTimeout = 400;
  private delayTimer : number = 0;
  @Output() onSearchEvent = new EventEmitter();

  constructor(private shoppingService : ShopService) { }

  ngOnInit(): void {
  }

  onSearch(event : any) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.onSearchEvent.emit(event.target.value);
    }, this.onKeyTimeout);
  }

  getValue() : string {
    return this.shoppingService.getSearchName();
  }

}
