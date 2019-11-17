import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueEditComponent } from './revenue-edit.component';

describe('RevenueEditComponent', () => {
  let component: RevenueEditComponent;
  let fixture: ComponentFixture<RevenueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
