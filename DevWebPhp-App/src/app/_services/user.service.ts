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
}
