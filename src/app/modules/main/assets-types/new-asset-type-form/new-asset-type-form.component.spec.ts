import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetTypeFormComponent } from './new-asset-type-form.component';

describe('NewAssetTypeFormComponent', () => {
  let component: NewAssetTypeFormComponent;
  let fixture: ComponentFixture<NewAssetTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssetTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
