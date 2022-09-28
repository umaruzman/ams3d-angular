import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMetricTypeFormComponent } from './new-metric-type-form.component';

describe('NewAssetTypeFormComponent', () => {
  let component: NewMetricTypeFormComponent;
  let fixture: ComponentFixture<NewMetricTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMetricTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMetricTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
