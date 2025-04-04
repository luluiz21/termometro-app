import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThermometerComponent } from './features/thermometer/thermometer.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    ThermometerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
