import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlogListComponent } from './orderlog-list.component';

describe('OrderlogListComponent', () => {
  let component: OrderlogListComponent;
  let fixture: ComponentFixture<OrderlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
