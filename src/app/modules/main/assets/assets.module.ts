import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetPropertiesComponent } from './asset-properties/asset-properties.component';
import { NewAssetFormComponent } from './new-asset-form/new-asset-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AssetsComponent,
    AssetPropertiesComponent,
    NewAssetFormComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AssetsModule { }
