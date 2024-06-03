import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, mergeMap, of, pluck, retry, share, switchMap, tap, throwError, toArray } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

export interface WeatherRes {

  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient, private notificationSVC: NotificationService) { }


  getForecast() {
    return this.getGeoLocation().pipe(
      // retry will try to resubscribbe if it got an error in first have to pass argument how much time we need to retry.
      // retry(1),
      map((coord) => {
        

        return new HttpParams()
          .set('lat', String(coord.latitude))
          .set('lon', String(coord.longitude))
          .set('units', 'metric')
          .set('appid', 'f557b20727184231a597c710c8be3106')

      }),
      /*switchMap returns an obervable generally usually use to make http req in side an ongoing observable chain. 
      but swithMap will discard the prev observable if it founds any new observable is coming.
       */
      switchMap((params) => {
        return this.http.get<WeatherRes>('https://api.openweathermap.org/data/2.5/forecast', {
          params: params
          // {
          //   lat: String(coord.latitude),
          //   lon:String(coord.longitude),
          //   units: 'metric',
          //   appid:'f557b20727184231a597c710c8be3106'
          // }
        })
      }),
      pluck('list'),
      /*mergeMap returns an obervable generally usually use to make http req in side an ongoing observable chain.
     but mergeMap will not discard the prev observable if it founds any new observable is coming.
      */
      mergeMap((list) => {
        return of(...list)
      }),
      filter((data, index) => index % 8 == 0),
      map((data) => {
        return {
          dateString: data.dt_txt,
          temp: data.main.temp
        }
      }),
      /*
       toArray will convert the output into an array.
       */
      toArray(),
      /*
      share operator -- when subscribed multiple times the pipe statement will gonna execute only once.
      */
      share()
    );
  }

  getGeoLocation() {
    /* Generating custom observable */
    return new Observable<GeolocationCoordinates>(observer => {
     
      
      // gathering values of observable to emit
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          //emitting values
          observer.next(position.coords);
          //marking as commplete
          observer.complete();
        },
        (err) => {
          //error handling
          observer.error(err);
        }
        //ultimately returning an observable only.
      )
    })
      .pipe(
        tap(() => {
          
          
          this.notificationSVC.addSuccess('Got the location.')
        }
        ),
        catchError((err) => {
          this.notificationSVC.addError("User has denied to access the location.");
          // throwError is like of() or new Observable() it will emit the value which can later flow through the chain.
          return throwError(err);
        })
      )
  }

}
