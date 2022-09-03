import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricsgraphComponent } from './metricsgraph.component';

const routes: Routes = [
  {path:'', component:MetricsgraphComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetricsgraphRoutingModule { }
