import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import { ViewerModule as VM } from 'ng2-adsk-forge-viewer';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    VM,
    SharedModule,
    NzProgressModule
  ]
})
export class ViewerModule { }
