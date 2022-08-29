import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsFormComponent } from './models-form.component';

describe('ModelsFormComponent', () => {
  let component: ModelsFormComponent;
  let fixture: ComponentFixture<ModelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
