import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

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

  logado() {
    return this.userService.logado();
  }
  sair() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
