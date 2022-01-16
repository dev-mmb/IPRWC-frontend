import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdminProductCardComponentComponent } from './account-admin-product-card-component.component';

describe('AccountAdminProductCardComponentComponent', () => {
  let component: AccountAdminProductCardComponentComponent;
  let fixture: ComponentFixture<AccountAdminProductCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAdminProductCardComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAdminProductCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
