import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetTypesRoutingModule } from './assets-types-routing.module';
import { AssetTypesComponent } from './asset-types.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewAssetTypeFormComponent } from './new-asset-type-form/new-asset-type-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AssetTypesComponent,
    NewAssetTypeFormComponent
  ],
  imports: [
    CommonModule,
    AssetTypesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AssetTypesModule { }
