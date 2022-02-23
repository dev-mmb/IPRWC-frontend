import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {GenericPopupComponent} from "../../../generic-popup/generic-popup.component";

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private router : Router, private orderService : OrderService, private modalService : NgbModal) { }

  ngOnInit(): void {
  }
  onOrder() {
    this.orderService.convertToOrder().then(() => {
      this.activeModal.close();
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Bestelling Succesvol";
      ref.confirmText = "Verder winkelen";
      ref.confirm = () => {
        this.router.navigate([""]);
      };
    }, () => {
      this.activeModal.close();
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Er is iets fout gegaan";
      ref.confirmText = "Terug naar winkel";

    });
  }
}
