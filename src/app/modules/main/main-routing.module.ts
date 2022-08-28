import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path:'', 
    component:MainComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'assets', loadChildren: () => import('./assets/assets.module').then(m => m.AssetsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
