import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.

    return throwError(
      'Something bad happened; please try again later.');
  }



  callApi(url: string, type: String, body: object, option: object) {
    let requestype: string = RequestType[type.toUpperCase()];
    switch (requestype) {
      case RequestType.GET:
        return this.http.get(url, option && option)
      case RequestType.POST:
        return this.http.post(url, body, option && option)
      case RequestType.PATCH:
        return this.http.patch(url, body, option && option)
      case RequestType.DELETE:
        return this.http.delete(url, option && option)
      default:
        return this.http.get(url, option && option)
    }
  }
}

enum RequestType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}