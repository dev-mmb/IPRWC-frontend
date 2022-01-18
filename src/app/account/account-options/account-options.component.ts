import {ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {AccountOptions} from "./account-options.model";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss']
})
export class AccountOptionsComponent implements OnInit {
  @Output() onSelectEvent : EventEmitter<AccountOptions> = new EventEmitter<AccountOptions>();
  selectedOption : AccountOptions = AccountOptions.OVERZICHT;
  shouldUseMobileLayout = false;
  shouldShowAdmin = false;

  constructor(private loginService : LoginService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.onResize(null);
    this.shouldShowAdmin = this.loginService.isAdmin();
  }

  onSelectOverzicht() {
    this.selectedOption = AccountOptions.OVERZICHT;
    this.onSelectEvent.emit(AccountOptions.OVERZICHT);
  }
  onSelectBestellingen() {
    this.selectedOption = AccountOptions.BESTELLINGEN;
    this.onSelectEvent.emit(AccountOptions.BESTELLINGEN);
  }
  onSelectAdmin() {
    this.selectedOption = AccountOptions.ADMIN;
    this.onSelectEvent.emit(AccountOptions.ADMIN);
  }
  onSelectUitloggen() {
    this.selectedOption = AccountOptions.LOGOUT;
    this.onSelectEvent.emit(AccountOptions.LOGOUT);
  }

  getOverzichtOption() {
    return AccountOptions.OVERZICHT;
  }
  getBestellingenOption() {
    return AccountOptions.BESTELLINGEN;
  }
  getAdminOption() {
    return AccountOptions.ADMIN;
  }
  getUitloggenOption() {
    return AccountOptions.LOGOUT;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.shouldUseMobileLayout = (document.getElementsByTagName("html")[0].offsetWidth <= 1058);
    this.cdr.detectChanges();
  }
}
