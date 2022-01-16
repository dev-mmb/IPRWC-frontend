import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductModel} from "../../../../../shop/ProductModel";
import {ShopService} from "../../../../../../services/shop.service";
import {GenericPopupComponent} from "../../../../../generic-popup/generic-popup.component";

@Component({
  selector: 'app-edit-product-popup',
  templateUrl: './edit-product-popup.component.html',
  styleUrls: ['./edit-product-popup.component.scss']
})
export class EditProductPopupComponent implements OnInit {
  product : ProductModel = new ProductModel();
  @Output() onProductChanged : EventEmitter<any> = new EventEmitter<any>();

  constructor(public activeModal : NgbActiveModal, private shopService : ShopService, private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.shopService.changeProduct(this.product, (p) => {
      this.activeModal.close();
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Product verandert!";
      ref.confirmText = "Sluit";
      this.onProductChanged.emit();
    }, () => {
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Er is iets fout gegaan!";
      ref.body = "het product is niet verandert";
      ref.confirmText = "Sluit";
      this.activeModal.close();
    });
  }


  onProductNameChange(event : any) {
    this.product.name = event.target.value;
  }
  onChangeDescription(event : any) {
    this.product.description = event.target.value;
  }
  onChangeProductPrice(event : any) {
    this.product.price = event.target.value;
  }
  onProductSpecsChanged(event : any) {
    this.product.specs = event.target.value;
  }
}
