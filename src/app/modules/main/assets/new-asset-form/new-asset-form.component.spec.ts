import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetFormComponent } from './new-asset-form.component';

describe('NewAssetFormComponent', () => {
  let component: NewAssetFormComponent;
  let fixture: ComponentFixture<NewAssetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
