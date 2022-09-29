import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '',canActivate: [AuthGuard], loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: 'viewer', canActivate: [AuthGuard],loadChildren: () => import('./modules/viewer/viewer.module').then(m => m.ViewerModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
