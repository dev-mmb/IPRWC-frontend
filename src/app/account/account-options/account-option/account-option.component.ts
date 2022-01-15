import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountOptions} from "../account-options.model";

@Component({
  selector: 'app-account-option',
  templateUrl: './account-option.component.html',
  styleUrls: ['./account-option.component.scss']
})
export class AccountOptionComponent implements OnInit {
  @Input() option : AccountOptions = AccountOptions.OVERZICHT;
  @Output() onSelect : EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {}

  onOptionSelected() {
    this.onSelect.emit();
  }

}
