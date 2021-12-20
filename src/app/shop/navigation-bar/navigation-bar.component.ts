import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Output() onSearchEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(value : string) {
    this.onSearchEvent.emit(value);
  }
}
