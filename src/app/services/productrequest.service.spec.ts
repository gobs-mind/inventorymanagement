import { TestBed } from '@angular/core/testing';

import { ProductrequestService } from './productrequest.service';

describe('ProductrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductrequestService = TestBed.get(ProductrequestService);
    expect(service).toBeTruthy();
  });
});
