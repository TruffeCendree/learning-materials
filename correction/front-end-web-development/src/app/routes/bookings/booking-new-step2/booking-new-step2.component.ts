import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-new-step2',
  templateUrl: './booking-new-step2.component.html',
  styleUrls: ['./booking-new-step2.component.css']
})
export class BookingNewStep2Component {
  latitude: number;
  longitude: number;
  startDate: Date;
  startHour: number;
  duration: number;

  constructor (private activatedRoute: ActivatedRoute) {
    const params = this.activatedRoute.snapshot.params as { latitude: string, longitude: string, startDate: string, startHour: string, duration: string };
    this.latitude = +params.latitude;
    this.longitude = +params.longitude;
    this.startDate = new Date(params.startDate);
    this.startHour = +params.startHour;
    this.duration = +params.duration;
  }
}
