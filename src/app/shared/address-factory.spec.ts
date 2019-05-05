import { AddressFactory } from './address-factory';

describe('AddressFactory', () => {
  it('should create an instance', () => {
    expect(new AddressFactory()).toBeTruthy();
  });
});
