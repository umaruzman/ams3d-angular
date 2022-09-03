import { TestBed } from '@angular/core/testing';

import { AssetTypesService } from './asset-types.service';

describe('AssetsService', () => {
  let service: AssetTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
