import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = 'http://localhost:5000/api/user';

  constructor(
    private http: HttpClient
  ) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

}
