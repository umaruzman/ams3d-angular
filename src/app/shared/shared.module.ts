import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

const nzModules = [
  NzButtonModule,
  NzCardModule,
  NzIconModule,
  NzInputModule,
  NzSelectModule,
  NzFormModule,
  NzCheckboxModule,
  NzToolTipModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...nzModules
  ],
  exports: [
    ...nzModules
  ]
})
export class SharedModule { }
