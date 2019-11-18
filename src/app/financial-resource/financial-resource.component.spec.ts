import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialResourceComponent } from './financial-resource.component';

describe('FinancialResourceComponent', () => {
  let component: FinancialResourceComponent;
  let fixture: ComponentFixture<FinancialResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialResourceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
