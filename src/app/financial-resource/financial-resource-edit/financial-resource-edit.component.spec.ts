import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialResourceEditComponent } from './financial-resource-edit.component';

describe('FinancialResourceEditComponent', () => {
  let component: FinancialResourceEditComponent;
  let fixture: ComponentFixture<FinancialResourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialResourceEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialResourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
