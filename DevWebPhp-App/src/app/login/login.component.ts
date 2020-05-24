import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../_services/request.service';
import { Request } from '../_models/Request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};
  form: FormGroup;
  request: Request = new Request();

  constructor(
    public router: Router,
    private userService: UserService,
    private requestService: RequestService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/request']);
    }
    this.validacao();
  }

  solicitarAcesso(template: any) {
    this.form.reset();
    template.show();
  }

  login() {
    this.userService.login(this.model).subscribe(
      (data) => {
        this.router.navigate(['/user']);
        this.toastr.success('Logado');
      }, error => {
        this.toastr.error(`Falha ao tentar logar! ${error}`);
      }
    );
  }

  salvarAlteracao(template: any) {
    if (this.form.valid) {
      this.request = Object.assign({}, this.form.value);

      if (this.request !== null) {
        this.requestService.post(this.request).subscribe(
          (newRequest: Request) => {
            this.toastr.success('Solicitação Cadastrada com Sucesso!');
            template.hide();
          }, error => {
            console.log(this.request.situacao);
            this.toastr.error(`Erro ao Solicitar Acesso. CODE: ${error}`);
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

}
