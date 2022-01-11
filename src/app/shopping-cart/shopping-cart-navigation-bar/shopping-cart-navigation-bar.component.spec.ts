import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartNavigationBarComponent } from './shopping-cart-navigation-bar.component';

describe('ShoppingCartNavigationBarComponent', () => {
  let component: ShoppingCartNavigationBarComponent;
  let fixture: ComponentFixture<ShoppingCartNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartNavigationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
