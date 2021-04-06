import { NotificationService } from './../services/notification.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        //let message = (error.error ? (error.error.message ? error.error.message : error.message) : error.message);
        let message = (error.error ? (error.error.description ? error.error.description : (error.message ? error.message : 'Unknown Error')) : 'Unknown Error');

        if (error.status === 401) { 
          // log out from application
          message = "The username or password you entered is incorrect.";
          this.notificationService.showError(message);
          location.reload(true);
          //return throwError(error);
        } else {
          this.notificationService.showError(message);
          return throwError(error);
        }
      })
    );
  }
}
