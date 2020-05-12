import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  titulo = 'User';
  user: User = new User();
  users: User[];
  filtroLista: string;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getUser();
    this.validacao();
  }
  detalhes() {}
  inserir() {}
  editar() {}
  excluirRequest() {}

  validacao() {
    this.form = this.fb.group({
      nome: ['' ],
      nomeCompleto: ['' ],
      email: [''],
      dataSolicitacao: [''],
      telefone: ['' ],
      senha: ['' ],
      descricao: ['']
    });
  }

  getUser() {
    this.userService.getAllUser().subscribe(
      (_user: User[]) => {
        this.users = _user;
        console.log(this.users);
      }, error => {
        console.log(error);
      }
    );
  }

}
