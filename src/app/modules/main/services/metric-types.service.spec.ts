import { TestBed } from '@angular/core/testing';

import { MetricTypesService } from './metric-types.service';

describe('MetricTypesService', () => {
  let service: MetricTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
