import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupSelectComponent } from './product-group-select.component';

describe('ProductGroupSelectComponent', () => {
  let component: ProductGroupSelectComponent;
  let fixture: ComponentFixture<ProductGroupSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGroupSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
