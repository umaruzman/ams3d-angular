import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAssetForm } from './assign-asset-form.component';

describe('AssignAssetForm', () => {
  let component: AssignAssetForm;
  let fixture: ComponentFixture<AssignAssetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAssetForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAssetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
