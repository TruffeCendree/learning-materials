import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking-new-step1',
  templateUrl: './booking-new-step1.component.html',
  styleUrls: ['./booking-new-step1.component.css']
})
export class BookingNewStep1Component {
  // configuration of choices
  durations: number[] = [];

  // user choices
  latitude: number;
  longitude: number;
  selectedDate: Date | null = null;
  duration: number;
  startHour = 7;

  // miscellaneous
  status: 'unknown' | 'checking' | 'no_proposal' = 'unknown';

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingsService: BookingsService
  ) {
    const params = this.activatedRoute.snapshot.params as { latitude: string, longitude: string };
    this.latitude = +params.latitude;
    this.longitude = +params.longitude;
    for (let duration = 2; duration <= 6; duration += 0.5) this.durations.push(duration);
    this.duration = this.durations[0];
  }

  /** Service must start at 7 AM or after */
  getMinStartHour () {
    return 7;
  }

  /** Service must end at 6 PM or before */
  getMaxStartHour () {
    return 18 - this.duration;
  }

  /** Changing duration impacts the maxStartHour, that may invalid current startHour */
  setDuration (duration: number) {
    this.duration = duration;
    this.startHour = Math.min(this.startHour, this.getMaxStartHour());
    this.status = 'unknown';
  }

  /** 0 => 00:00, 0.5 => 00:30, ..., 16.5 => 16:30 */
  formatTime (hoursAndMinutes: number) {
    const hours = Math.trunc(hoursAndMinutes);
    const minutes = Math.round((hoursAndMinutes % 1) * 60);
    return `${hours < 10 ? '0' + hours : hours}:${!minutes ? '00' : (minutes < 10 ? '0' + minutes : minutes)}`;
  }

  async submit () {
    if (!this.selectedDate) return;
    this.status = 'checking';

    const proposals = await this.bookingsService.proposals({
      latitude: this.latitude,
      longitude: this.longitude,
      startTime: this.selectedDate.getTime() + this.startHour * 3600 * 1000,
      durationInHours: this.duration
    });

    if (proposals.proposals.length === 0) {
      this.status = 'no_proposal';
    } else {
      const formattedDate = this.selectedDate.toISOString().split('T')[0];
      await this.router.navigateByUrl(`/bookings/new/step2/${this.latitude}/${this.latitude}/at/${formattedDate}/${this.startHour}/duration/${this.duration}`);
    }
  }
}
