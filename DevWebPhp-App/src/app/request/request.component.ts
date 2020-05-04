import { Component, OnInit } from '@angular/core';
import { RequestService } from '../_services/request.service';
import { Request } from '../_models/Request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  /* Request */
  request: Request = new Request();
  requests: Request[];
  _filtroLista = '';
  requestFiltradas: Request[] = [];

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.requestFiltradas = this.filtroLista ? this.filtrarLista(this.filtroLista) : this.requests;
  }

  constructor(
    private requestService: RequestService
  ) { }


  ngOnInit() {
    this.getRequest();
  }

  filtrarLista(filtrarPor: string): Request[] {
    this.requestService.GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(filtrarPor).subscribe(
      data => {
        this.requestFiltradas = data;
        return this.requests;
      }, error => {
        console.log(`Erro. Code: ${error}`);
      }
    );
    return [];
  }

  detalhes(detalhes: any) {
    detalhes.show();
  }

  editar(editar: any) {
    editar.show();
  }

  salvarAlteracao() {}

  getRequest() {
    return this.requestService.getAllRequest().subscribe(
      (_request: Request[]) => {
        this.requests = _request;
        this.requestFiltradas = this.requests;
        console.log(_request);
      }, error => {
        console.log(error);
      }
    );
  }
}
