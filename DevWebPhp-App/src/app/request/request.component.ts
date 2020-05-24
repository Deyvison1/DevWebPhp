import { Component, OnInit } from '@angular/core';
import { RequestService } from '../_services/request.service';
import { Request } from '../_models/Request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';

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
  metodoSalvar: string;
  titulo = 'Request';
  user: User = new User();

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
    private toastr: ToastrService,
    private userService: UserService
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
  confirmarAutorizacao(templateAutorizacao: any, requestUser: User) {
    templateAutorizacao.show();
    this.user = requestUser;
    this.user.nivelUsuario = 2;
    this.form.patchValue(requestUser);

    console.log(`Nivel: ${this.user.nivelUsuario}, Nome Completo: ${this.user.nomeCompleto}`);
  }
  autorizarUsuario(templateAutorizar: any) {
    if (this.form.valid) {
      this.user = Object.assign({ }, this.user);

      this.userService.post(this.user).subscribe(
        (autorizarUser: User) => {

          this.request = Object.assign({ id: this.user.id}, this.form.value);
          this.request.situacao = 1;
          this.requestService.put(this.request).subscribe(
            (data) => {
              templateAutorizar.hide();
              this.getRequest();
              this.toastr.success('Usuario Autorizado com Sucesso!');
            }, error => {
              this.toastr.error(`Erro CODE: ${error}`);
            }
          );

        }, error => {
          this.toastr.error(`Erro ao Autorizar Usuario. CODE: ${error}`);
        }
      );
    }
  }

  detalhes(detalhes: any, request: Request) {
    detalhes.show();
    this.request = request;
    this.form.patchValue(request);
  }

  inserir(inserir: any) {
    this.metodoSalvar = 'post';
    this.form.reset();
    inserir.show();
  }

  editar(templateEdit: any, request: Request) {
    this.metodoSalvar = 'put';
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
      if (this.metodoSalvar === 'post') {
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
      descricao: ['', Validators.required],
      situacao: ['', [Validators.max(2), Validators.min(1)]]
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
