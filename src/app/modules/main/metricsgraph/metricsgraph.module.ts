import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricsgraphRoutingModule } from './metricsgraph-routing.module';
import { MetricsgraphComponent } from './metricsgraph.component';
import { PlotlyModule } from 'angular-plotly.js';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MetricsgraphComponent
  ],
  imports: [
    CommonModule,
    MetricsgraphRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PlotlyModule
  ]
})
export class MetricsgraphModule { }
