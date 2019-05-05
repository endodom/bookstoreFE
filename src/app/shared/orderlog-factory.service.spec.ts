import { TestBed } from '@angular/core/testing';

import { OrderlogFactoryService } from './orderlog-factory.service';

describe('OrderlogFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderlogFactoryService = TestBed.get(OrderlogFactoryService);
    expect(service).toBeTruthy();
  });
});
