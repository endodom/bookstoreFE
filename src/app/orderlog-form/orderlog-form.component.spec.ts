import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlogFormComponent } from './orderlog-form.component';

describe('OrderlogFormComponent', () => {
  let component: OrderlogFormComponent;
  let fixture: ComponentFixture<OrderlogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
