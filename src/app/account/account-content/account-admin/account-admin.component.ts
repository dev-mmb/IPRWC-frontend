import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../../shop/ProductModel";
import {ShopService} from "../../../../services/shop.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddProductComponent} from "./add-product/add-product.component";

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.scss']
})
export class AccountAdminComponent implements OnInit {
  products : ProductModel[] = [];

  constructor(private shopService : ShopService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.shopService.turnOffAllTags();
    this.shopService.getProducts().then((p) => {
      this.products = p;
    });
  }

  onProductChanged() {
    this.ngOnInit();
  }

  openAddProductPopup() {
    let ref = this.modalService.open(AddProductComponent).componentInstance;
    let sub = ref.onComplete.subscribe(() => {
      this.ngOnInit();
      sub.unsubscribe();
    });
  }
}
