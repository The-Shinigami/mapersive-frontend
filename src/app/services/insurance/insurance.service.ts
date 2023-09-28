import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, catchError, map, throwError } from 'rxjs';
import Insurance from 'src/app/shared/model/insurance';
import ResponseHandler from 'src/app/shared/model/response';
import { NotificationService } from '../notification/notification.service';

const URL_BASE = "http://localhost:8080/api/"
@Injectable({
  providedIn: 'root'
})

export class InsuranceService {
  api = axios.create({ baseURL: URL_BASE })
  
  insurances:Insurance[] = []
  totalElements:number = 0
  constructor(private http: HttpClient,private notificationService:NotificationService) { }
  
  getAll(page = '0',size = '5',sort = { column: 'id', direction: 'asc' }): Observable<[Insurance[], number]> {
    
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', `${sort.column},${sort.direction}`);

    return this.http.get<[Insurance[], number]>(URL_BASE+'insurance', { params }).pipe(
      map((response:any) => {
        return [ response.content, response.totalElements ];
      })
    );
  }

  remove(row:Insurance):Observable<ResponseHandler>{

  return this.http.delete<ResponseHandler>(URL_BASE+"insurance/"+row.insuranceId.toString()).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(error.error);
    }));

  }

  saveInsert(row:Insurance):Observable<ResponseHandler>{
       return this.http.post<ResponseHandler>(URL_BASE+"insurance",row).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error);
        }));
      
     }

  saveUpdate(row:Insurance):Observable<ResponseHandler>{
     return this.http.put<ResponseHandler>(URL_BASE+"insurance",row).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error);
      }));
    }
  
}
