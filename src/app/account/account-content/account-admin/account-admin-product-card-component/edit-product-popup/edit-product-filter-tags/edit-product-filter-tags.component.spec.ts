import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductFilterTagsComponent } from './edit-product-filter-tags.component';

describe('EditProductFilterTagsComponent', () => {
  let component: EditProductFilterTagsComponent;
  let fixture: ComponentFixture<EditProductFilterTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductFilterTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductFilterTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
