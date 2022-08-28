import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPropertiesComponent } from './asset-properties.component';

describe('AssetPropertiesComponent', () => {
  let component: AssetPropertiesComponent;
  let fixture: ComponentFixture<AssetPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
