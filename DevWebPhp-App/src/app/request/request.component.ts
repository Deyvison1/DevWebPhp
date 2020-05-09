import { Component, OnInit } from '@angular/core';
import { RequestService } from '../_services/request.service';
import { Request } from '../_models/Request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private fb: FormBuilder,
    private toastr: ToastrService
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

  detalhes(detalhes: any, request: Request) {
    detalhes.show();
    this.request = request;
    this.form.patchValue(request);
  }

  inserir(inserir: any) {
    this.form.reset();
    inserir.show();
  }

  editar(templateEdit: any, request: Request) {
    templateEdit.show();
    this.request = request;
    this.form.patchValue(request);
  }

  excluirRequest(request: Request, templateDelete: any) {
    templateDelete.show(templateDelete);
    this.request = request;
  }
  confirmeDeletar(templateConfirmeDeletar: any) {
    this.requestService.deletarRequest(this.request.id).subscribe(
      (data) => {
        templateConfirmeDeletar.hide();
        this.getRequest();
        this.toastr.success('Deletado com Sucesso!!');
        console.log(data);
      }, error => {
        this.toastr.error(error);
        console.log(error);
      }
    );
  }

  salvarAlteracao(template: any) {
    if (this.form.valid) {
      if (!this.request.id) {
        this.request = Object.assign({}, this.form.value);

        this.requestService.post(this.request).subscribe(
          (newRequest: Request) => {
            console.log(newRequest);
            template.hide();
            this.getRequest();
            this.toastr.success('Solicitação Cadastrada com Sucesso!!');
          }, error => {
            this.toastr.error(error);
            console.log(error);
          }
        );
      } else {
        this.request = Object.assign({ id: this.request.id }, this.form.value);
        this.requestService.put(this.request).subscribe(
          (editRequest: Request) => {
            template.hide();
            this.getRequest();
            this.toastr.success('Atualizado com Sucesso!!');
          }, error => {
            this.toastr.error(error);
            console.log(error);
          }
        );
      }
    }
  }

  validacao() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(130)]],
      nomeCompleto: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(170)]],
      email: ['', [Validators.email, Validators.required]],
      dataSolicitacao: [''],
      telefone: ['', Validators.required],
      senha: ['', [Validators.minLength(4), Validators.maxLength(12)]],
      descricao: ['', Validators.required]
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
