import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsgraphComponent } from './metricsgraph.component';

describe('MetricsgraphComponent', () => {
  let component: MetricsgraphComponent;
  let fixture: ComponentFixture<MetricsgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricsgraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
