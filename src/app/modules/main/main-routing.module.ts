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
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'asset-types', loadChildren: () => import('./assets-types/asset-types.module').then(m => m.AssetTypesModule) },
      { path: 'metric-types', loadChildren: () => import('./metric-types/metric-types.module').then(m => m.MetricTypesModule) },
      { path: 'models', loadChildren: () => import('./models/models.module').then(m => m.ModelsModule) },
      { path: 'metrics-graph', loadChildren: () => import('./metricsgraph/metricsgraph.module').then(m => m.MetricsgraphModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
