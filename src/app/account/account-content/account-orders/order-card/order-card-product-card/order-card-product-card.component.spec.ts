import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardProductCardComponent } from './order-card-product-card.component';

describe('OrderCardProductCardComponent', () => {
  let component: OrderCardProductCardComponent;
  let fixture: ComponentFixture<OrderCardProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCardProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCardProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
