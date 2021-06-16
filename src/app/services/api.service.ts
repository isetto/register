import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable( {
  providedIn: 'root'
} )
export class ApiService {
  baseUrl = environment.url

  constructor( private httpClient: HttpClient ) { }

  register( user: User ): Observable<User> {
    const url = `${this.baseUrl}users`
    return this.httpClient.post<User>( url, user )
  }
}
