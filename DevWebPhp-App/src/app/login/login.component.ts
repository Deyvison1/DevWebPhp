import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};

  constructor(
    public router: Router,
    private userService: UserService,
    private toastr: ToastrService 
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/request']);
    }
  }

  login(){
    this.userService.login(this.model).subscribe(
      (data) => {
        this.router.navigate(['/user']);
        this.toastr.success('Logado');
      }, error => {
        this.toastr.error(`Falha ao tentar logar! ${error}`);
      }
    );
  }

}
