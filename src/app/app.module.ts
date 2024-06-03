import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';
import { NotificationModule } from './notification/notification.module';
import { NewsApiModule } from './news-api/news-api.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherModule,
    NotificationModule,
    NewsApiModule,

  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
