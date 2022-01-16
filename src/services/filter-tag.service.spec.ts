import { TestBed } from '@angular/core/testing';

import { FilterTagService } from './filter-tag.service';

describe('FilterTagService', () => {
  let service: FilterTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
