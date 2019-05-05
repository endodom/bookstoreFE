import { TestBed } from '@angular/core/testing';

import { OrderFactoryService } from './order-factory.service';
import {describe, expect} from "@angular/core/testing/src/testing_internal";

describe('OrderFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderFactoryService = TestBed.get(OrderFactoryService);
    expect(service).toBeTruthy();
  });
});
