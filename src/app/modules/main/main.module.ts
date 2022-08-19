import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutsModule,
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
