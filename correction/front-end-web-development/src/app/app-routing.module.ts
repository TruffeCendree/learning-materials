import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MeService } from './me.service';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { AuthenticatedGuard } from './authenticated.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { me: MeService } },
  { path: 'login', component: LoginComponent, resolve: { me: MeService }, canActivate: [UnauthenticatedGuard] },
  { path: 'profile', component: ProfileComponent, resolve: { me: MeService }, canActivate: [AuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
