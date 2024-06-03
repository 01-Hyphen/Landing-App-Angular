import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, pluck, switchMap, tap, throwError } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

export interface Article{
  title:string;
  url:string;
}

export interface PageRes{
  totalResults:number
  articles:Article[];
}

export interface Sample{
  pageNumber?:number;
  category?:string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  url: string = 'https://newsapi.org/v2/top-headlines'
  country:string = 'in'
  pageSize:number = 15;
  apiKey: string = '914efb944f134277b9310957ab86705a'
  category: string = 'sports'

  private pageInput:Subject<Sample>;
  pageOutput:Observable<Article[]>
  noOfPages:Subject<number>


  constructor(private http:HttpClient, private notificationSvc:NotificationService) { 
    this.noOfPages = new Subject();
    this.pageInput = new Subject();
    this.pageOutput = this.pageInput.pipe(
      map(({pageNumber,category})=>{
       if(!category){
         return new HttpParams()
           .set('country', this.country)
           .set('pageSize', this.pageSize)
           .set('apiKey', this.apiKey)
           .set('page', pageNumber)
           .set('category', 'sports')
        
       }
        return new HttpParams()
        .set('country',this.country)
        .set('pageSize',this.pageSize)
        .set('apiKey',this.apiKey)
        .set('page',pageNumber)
        .set('category',category)
      }),

      switchMap((params)=>{
        return this.http.get<PageRes>(this.url,{params});
      }),

      tap((pageRes:PageRes)=>{
        let totalPages = Math.ceil(pageRes.totalResults/this.pageSize);
        this.noOfPages.next(totalPages);
      }),

      pluck('articles'),

      tap(()=>{
        this.notificationSvc.addSuccess('Recieving news...')
      }),
      catchError((err)=>{
        this.notificationSvc.addError('Cannot fetch the artilces. Check the internet connection.');
        return throwError(err);
      })
    )

  }

  getPage(page:number){
    this.pageInput.next({pageNumber:page});
  }

  getCategory(category:string){
    this.pageInput.next({category:category})
  }

}
