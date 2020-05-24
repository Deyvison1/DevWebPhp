import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = 'http://localhost:5000/api/user';
  jwtHelper = new JwtHelperService();
  decodeToken: any;

  constructor(
    private http: HttpClient
  ) { }

  // Todos

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  // Buscar

  GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(buscar: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/GetBuscar/${buscar}`);
  }

  // Inserir

  post(user: User) {
    return this.http.post(this.baseURL, user);
  }

  // Editar

  put(user: User) {
    return this.http.put(`${this.baseURL}/${user.id}`, user);
  }

  // Deletar

  deletar(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // Logar
  login(model: any) {
    return this.http.post(`${this.baseURL}/login`, model).pipe(
      map((resp: any) => {
        const user = resp;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('nome', this.decodeToken.unique_name);
          sessionStorage.setItem('nivelUsuario', this.decodeToken.role);
        }
      })
    );
  }
  logado() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
