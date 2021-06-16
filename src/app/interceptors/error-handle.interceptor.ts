import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  constructor( private toastr: ToastrService ) { }

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    return next.handle( request ).pipe(
      catchError( error => {
        const errors = error.error.errors
        if ( errors?.length > 0 ) {
          errors.forEach( ( err: any ) => {
            this.toastr.error( err?.name || err?.description, 'Error' );
          } )

        }
        return throwError( errors )
      } )
    )
  }
}
