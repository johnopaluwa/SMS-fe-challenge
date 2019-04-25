import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
      private http: HttpClient
  ) {}

  public get(): Observable < any > {
      return this.http.get("/assets/data.json")
          .pipe(
              catchError(error => of ({
                  error
              }))
          );
  }

}