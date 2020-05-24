import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { template } from '@angular/core/src/render3';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  titulo = 'User';
  user: User = new User();
  users: User[];
  _filtroLista = '';
  form: FormGroup;
  metodoSalvar: string;
  usersFiltrados: User[] = [];

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.usersFiltrados = this._filtroLista ? this.filtrarLista(this.filtroLista) : this.users;
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUser();
    this.validacao();
  }

  filtrarLista(filtraPor: string): User[] {
    this.userService.GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(filtraPor).subscribe(
      data => {
        this.usersFiltrados = data;
        return this.users;
      }, error => {
        console.log(`Erro. Code: ${error}`);
      }
    );
    return [];
  }

  nivelUsuario() {
    return sessionStorage.getItem('nivelUsuario');
  }

  detalhes(detalhes: any, _user: User) {
    detalhes.show();
    this.form.patchValue(_user);
  }

  inserir(inserir: any) {
    this.metodoSalvar = 'post';
    this.form.reset();
    inserir.show();
  }
  editar(dados: any, _user: User) {
    this.metodoSalvar = 'put';
    this.form.reset();
    dados.show();
    this.user = _user;
    this.form.patchValue(_user);
  }
  excluirRequest(_user: User, dados: any) {
    dados.show(dados);
    this.user = _user;
  }

  confirmeDelete(dados: any) {
    this.userService.deletar(this.user.id).subscribe(
      (data) => {
        this.toastr.success('Usuario Deletado com Sucesso!!');
        dados.hide();
        this.getUser();
      }, error => {
        this.toastr.error(`Erro ao deletar Usuario. CODE: ${error}`);
      }
    );
  }

  salvarAlteracao(dados: any) {
    if (this.form.valid) {
      if (this.metodoSalvar === 'post') {
      this.user = Object.assign({ }, this.form.value);
      this.userService.post(this.user).subscribe(
        (newUser: User) => {
          this.toastr.success('Usuario Cadastrado com Sucesso!!');
          dados.hide();
          this.getUser();
        }, error => {
          this.toastr.error(`Erro ao deletar Usuario. CODE: ${error}`);
        }
      );
      } else if (this.metodoSalvar === 'put') {
        this.user = Object.assign({ id: this.user.id }, this.form.value);
        this.userService.put(this.user).subscribe(
          (editUser: User) => {
            this.toastr.success('Usuario Atualizado com Sucesso!!');
            dados.hide();
            this.getUser();
          }, error => {
            this.toastr.error(`Erro ao atualizar Usuario. CODE: ${error}`);
          }
        );
      } else {
        console.log('Falha');
      }
    }
  }

  validacao() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(130)]],
      nomeCompleto: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(170)]],
      email: ['', [Validators.email, Validators.required]],
      nivelUsuario: ['', [Validators.required, Validators.max(2), Validators.min(1)]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    });
  }

  getUser() {
    return this.userService.getAllUser().subscribe(
      (_user: User[]) => {
        this.users = _user;
        this.usersFiltrados = this.users;
        console.log(_user);
      }, error => {
        this.toastr.error('Sem dados');
      }
    );
  }

}
