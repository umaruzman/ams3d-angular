import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutsModule } from './layouts/layouts.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { AppService } from './app.service';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzMessageModule,
    NzModalModule,
    LayoutsModule,
    ViewerModule
  ],
  providers: [
    [{
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppService],
      useFactory: (service: AppService) => {
        return () => {
          return service.init()
        }
      }
    }],
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
