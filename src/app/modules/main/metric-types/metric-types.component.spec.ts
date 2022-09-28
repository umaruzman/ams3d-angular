import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricTypesComponent } from './metric-types.component';

describe('AssetTypesComponent', () => {
  let component: MetricTypesComponent;
  let fixture: ComponentFixture<MetricTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
