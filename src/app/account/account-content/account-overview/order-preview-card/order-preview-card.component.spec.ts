import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPreviewCardComponent } from './order-preview-card.component';

describe('OrderPreviewCardComponent', () => {
  let component: OrderPreviewCardComponent;
  let fixture: ComponentFixture<OrderPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPreviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
