import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductModel} from "../../../../shop/ProductModel";
import {ShopService} from "../../../../../services/shop.service";
import {GenericPopupComponent} from "../../../../generic-popup/generic-popup.component";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product : ProductModel = new ProductModel();
  onComplete = new EventEmitter<any>();

  constructor(public activeModal : NgbActiveModal, private shopService : ShopService, private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.shopService.createProduct(this.product, (p) => {
      this.activeModal.close();
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Product succesvol toegevoegd!";
      ref.confirmText = "Ok";
      this.onComplete.emit();
    }, () => {
      this.activeModal.close();
      let ref = this.modalService.open(GenericPopupComponent).componentInstance;
      ref.title = "Er is iets fout gegaan";
      ref.confirmText = "Terug";
      this.onComplete.emit();
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

  shouldEnableButton() : boolean {
    return (this.product.name !== "" &&
            this.product.description !== "" &&
            this.product.price !== 0 &&
            this.product.filterTags.length !== 0 &&
            this.product.image !== "");
  }
}
