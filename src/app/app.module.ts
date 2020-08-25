import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { MapComponent } from './map/map.component';
import { ErrorComponent } from './error/error.component';
import { HttpErrorHandler } from './shared/services/httperrorhandler';
import { LocationExchange } from './shared/services/locationexchange';
import { SliderComponent } from './slider/slider.component';
import { SliderService } from './slider/slider.service';
import { MapService } from './map/map.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    MapComponent,
    ErrorComponent,
    SliderComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [HttpErrorHandler, LocationExchange, SliderService, MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
