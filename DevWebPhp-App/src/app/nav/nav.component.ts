import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { User } from '../_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  nomeLogado() {
    return sessionStorage.getItem('nome');
  }

  nivelUsuario() {
    return sessionStorage.getItem('nivelUsuario');
  }

  logado() {
    return this.userService.logado();
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  perfil(userDetails: any) {
    userDetails.show();
  }

}
