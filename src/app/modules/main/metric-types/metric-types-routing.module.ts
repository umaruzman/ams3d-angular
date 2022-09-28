import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricTypesComponent } from './metric-types.component';

const routes: Routes = [
  {path:'', component:MetricTypesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTypesRoutingModule { }
