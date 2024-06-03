import { Component } from '@angular/core';
import { WeatherRes, WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {

  forecast$: Observable<{ dateString: string; temp: number; }[]>;

  constructor(private weatherSvc: WeatherService) {
    

    this.forecast$ = this.weatherSvc.getForecast();
    // console.log('from forecast');
    // this.weatherSvc.getForecast().subscribe((res)=>{console.log(res);
    // })
    
  }


}
