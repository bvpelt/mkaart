import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LocationComponent } from "./location/location.component";
import { MapComponent } from "./map/map.component";
import { ErrorComponent } from "./error/error.component";
import { HttpErrorHandler } from "./shared/services/httperrorhandler";
import { LocationExchange } from "./shared/services/locationexchange";
import { ResizerComponent } from './resizer/resizer.component';

@NgModule({
  declarations: [AppComponent, LocationComponent, MapComponent, ErrorComponent, ResizerComponent],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [HttpErrorHandler, LocationExchange],
  bootstrap: [AppComponent],
})
export class AppModule {}
