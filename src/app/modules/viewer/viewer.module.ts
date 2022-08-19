import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import { ViewerModule as VM } from 'ng2-adsk-forge-viewer';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    VM,
    SharedModule,
    NzProgressModule,
    NzDrawerModule
  ]
})
export class ViewerModule { }
