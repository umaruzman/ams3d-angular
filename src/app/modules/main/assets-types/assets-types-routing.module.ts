import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetTypesComponent } from './asset-types.component';

const routes: Routes = [
  {path:'', component:AssetTypesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTypesRoutingModule { }
