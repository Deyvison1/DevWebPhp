import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth/auth.guard';

const routes: Routes = [
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'request', pathMatch: 'full' },
  { path: '**', redirectTo: 'request' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
