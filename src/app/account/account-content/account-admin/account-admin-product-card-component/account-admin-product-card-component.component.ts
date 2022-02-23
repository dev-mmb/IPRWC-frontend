import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from "../../../../shop/ProductModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditProductPopupComponent} from "./edit-product-popup/edit-product-popup.component";
import {HttpService} from "../../../../../services/http.service";

@Component({
  selector: 'app-account-admin-product-card-component',
  templateUrl: './account-admin-product-card-component.component.html',
  styleUrls: ['./account-admin-product-card-component.component.scss',
    '../../../../shop/product-cards/product-card/product-card.component.scss']
})
export class AccountAdminProductCardComponentComponent implements OnInit {
  @Input() product : ProductModel = new ProductModel();
  @Output() onProductChanged = new EventEmitter<any>();

  constructor(private modalService : NgbModal, public http : HttpService) { }

  ngOnInit(): void {
  }

  editButtonClicked() {
    let ref = this.modalService.open(EditProductPopupComponent).componentInstance;
    ref.product = this.product;
    let sub = ref.onProductChanged.subscribe(() => {
      this.productChanged();
      sub.unsubscribe();
    });
  }

  productChanged() {
    this.onProductChanged.emit();
  }

}
