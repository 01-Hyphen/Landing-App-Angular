import { Component } from '@angular/core';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LandingApp';
  constructor(private weatherSvs:WeatherService){
    console.log('HIiiiiii');
    
   
  }
}
