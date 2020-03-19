import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Facebook } from '@ionic-native/facebook/ngx';
import { HeaderComponent } from './header/header.component';
import { HeaderComponentModule } from './header/header.module';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { HttpService } from './services/http.service';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HeaderComponentModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    AuthenticationService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
