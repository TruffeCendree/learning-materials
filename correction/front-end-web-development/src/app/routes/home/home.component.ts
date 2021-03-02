import { Component } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { BookingsService } from 'src/app/services/bookings.service';
import { PostalAddress } from '../../shared/postal-address-input/postal-address-input.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  postalAddress: PostalAddress | null = null;
  coverage: 'unknown' | 'checking' | 'covered' | 'uncovered' = 'unknown';
  faCircleNotch = faCircleNotch;

  constructor (private bookingsService: BookingsService) {}

  async setPostalAddress (newValue: PostalAddress | null) {
    this.postalAddress = newValue;

    if (newValue) {
      this.coverage = 'checking';
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await this.bookingsService.coverage({ latitude: newValue.latitude, longitude: newValue.longitude });
      this.coverage = res.covered ? 'covered' : 'uncovered';
    } else {
      this.coverage = 'unknown';
    }
  }
}
