import { Component, OnInit } from '@angular/core';
import { RequestService } from '../_services/request.service';
import { Request } from '../_models/Request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  form: FormGroup;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.requestFiltradas = this._filtroLista ? this.filtrarLista(this.filtroLista) : this.requests;
  }

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.validacao();
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

  deletar(templateDelete: any) {
    templateDelete.show();
  }

  salvarAlteracao() { }

  validacao() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(130)]],
      nomeCompleto: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(170)]],
      email: ['', [Validators.email, Validators.required]],
      dataSolicitacao: [''],
      telefone: ['', Validators.required],
      senha: ['', [Validators.minLength(4), Validators.maxLength(12)]],
      descricao: ['']
    });
  }

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
