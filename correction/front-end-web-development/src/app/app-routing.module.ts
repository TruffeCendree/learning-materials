import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { MeService } from './services/me.service';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

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
