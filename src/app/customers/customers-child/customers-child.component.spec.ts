import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersChildComponent } from './customers-child.component';

describe('CustomersChildComponent', () => {
  let component: CustomersChildComponent;
  let fixture: ComponentFixture<CustomersChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
