import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutsModule } from './layouts/layouts.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { AppService } from './app.service';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

PlotlyModule.plotlyjs = PlotlyJS;

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
    ViewerModule,
    NzTabsModule,
    PlotlyModule
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
    { provide: NZ_I18N, useValue: en_US },
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
