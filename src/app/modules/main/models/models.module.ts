import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsComponent } from './models.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelsFormComponent } from './models-form/models-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModelsComponent,
    ModelsFormComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ModelsModule { }
