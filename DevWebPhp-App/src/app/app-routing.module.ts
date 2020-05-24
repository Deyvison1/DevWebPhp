import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { KeyComponent } from './key/key.component';

const routes: Routes = [
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'key', component: KeyComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
