import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetTypesRoutingModule } from './metric-types-routing.module';
import { MetricTypesComponent } from './metric-types.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewMetricTypeFormComponent } from './new-metric-type-form/new-metric-type-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MetricTypesComponent,
    NewMetricTypeFormComponent
  ],
  imports: [
    CommonModule,
    AssetTypesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MetricTypesModule { }
