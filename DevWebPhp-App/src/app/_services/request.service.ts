import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Request } from '../_models/Request';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseURL = 'http://localhost:5000/api/request';

  constructor(
    private http: HttpClient
  ) { }

  getAllRequest(): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseURL);
  }
  GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(buscar: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseURL}/GetBuscar/${buscar}`);
  }
  // INSERIR
  post(request: Request) {
    return this.http.post(this.baseURL, request);
  }
  // EDITAR
  put(request: Request) {
    return this.http.put(`${this.baseURL}/${request.id}`, request);
  }
  // DELETAR
  deletarRequest(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
