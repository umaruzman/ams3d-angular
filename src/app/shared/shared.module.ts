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
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

const nzModules = [
  NzButtonModule,
  NzCardModule,
  NzIconModule,
  NzInputModule,
  NzSelectModule,
  NzFormModule,
  NzCheckboxModule,
  NzToolTipModule,
  NzTableModule,
  NzDividerModule,
  NzTabsModule,
  NzSwitchModule
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
