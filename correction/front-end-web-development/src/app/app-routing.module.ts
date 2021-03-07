import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { MeService } from './services/me.service';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { BookingNewStep1Component } from './routes/bookings/booking-new-step1/booking-new-step1.component';
import { BookingNewStep2Component } from './routes/bookings/booking-new-step2/booking-new-step2.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { me: MeService } },
  { path: 'login', component: LoginComponent, resolve: { me: MeService }, canActivate: [UnauthenticatedGuard] },
  { path: 'profile', component: ProfileComponent, resolve: { me: MeService }, canActivate: [AuthenticatedGuard] },
  { path: 'bookings/new/step1/:latitude/:longitude', component: BookingNewStep1Component, resolve: { me: MeService } },
  { path: 'bookings/new/step2/:latitude/:longitude/at/:startDate/:startHour/duration/:duration', component: BookingNewStep2Component, resolve: { me: MeService } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
