import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'request', component: RequestComponent },
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: 'request', pathMatch: 'full' },
  { path: '**', redirectTo: 'request' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
