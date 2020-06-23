import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { MapComponent } from './map/map.component';
import { HttpErrorHandler } from './shared/services/httpErrorHandler';
import { LocationExchange } from './shared/services/locationExchange';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    MapComponent,
    ErrorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpErrorHandler, LocationExchange],
  bootstrap: [AppComponent]
})
export class AppModule { }
