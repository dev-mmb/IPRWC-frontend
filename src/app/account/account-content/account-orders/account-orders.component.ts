import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {OrderModel} from "../../../shopping-cart/shopping-cart-list/order-popup/order.model";
import {OrderService} from "../../../../services/order.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit, AfterViewInit {
  @ViewChildren("orders") orderRefs : QueryList<ElementRef> = new QueryList<ElementRef>();

  @Input() orderToScrollTo : OrderModel | null = null;
  orders : OrderModel[] = [];

  constructor(private orderService : OrderService) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.orderService.getOrders((orders) => {
      this.orders = orders;
      if (this.orderToScrollTo !== null) {
        this.scrollToOrder(this.orderToScrollTo.id);
      }
    }, () => {});
  }

  scrollToOrder(id : string) {
    // workaround to make sure the view has been loaded
    setTimeout(() => {
      for (let i = 0; i < this.orderRefs.length; i++) {
        let ref = this.orderRefs.get(i);
        if (ref !== undefined) {
          if (ref.nativeElement.firstChild.id === id) {
            ref.nativeElement.firstChild.scrollIntoView({behavior: "smooth"});
            this.orderToScrollTo = null;
            return;
          }
        }
      }
    }, 100);

  }
}
