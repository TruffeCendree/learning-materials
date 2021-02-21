import { Component, Input, Output, EventEmitter } from '@angular/core';
import Debounce from 'src/app/decorators/debounce.decorator';
import { GeocodeService, NominatimResult } from 'src/app/services/geocode.service';

export interface PostalAddress {
  postalAddress: string
  latitude: number
  longitude: number
}

@Component({
  selector: 'app-postal-address-input',
  templateUrl: './postal-address-input.component.html',
  styleUrls: ['./postal-address-input.component.css']
})
export class PostalAddressInputComponent {
  @Input()
  ngModel: PostalAddress | string = ''

  @Output()
  ngModelChange = new EventEmitter<PostalAddress | null>()
  geocodingResults: PostalAddress[] = []

  constructor (private geocodeService: GeocodeService) {}

  async onInputChanged (value: string | PostalAddress) {
    if (typeof value === 'string') {
      // user entered result triggers a call to openstreet map
      await this.searchAddress(value);
      this.ngModelChange.emit(null);
    } else {
      // PostalAddress is propagdated to parent component
      this.ngModelChange.emit(value);
    }
  }

  @Debounce(1000)
  async searchAddress (rawPostalAddress: string) {
    const results = await this.geocodeService.geocodeCity(rawPostalAddress);
    this.geocodingResults = results.map(_ => ({ postalAddress: _.display_name, latitude: _.lat, longitude: _.lon }));
    if (this.geocodingResults.length) this.ngModelChange.emit(this.geocodingResults[0]);
  }

  displayResult (value: PostalAddress) {
    return value?.postalAddress;
  }
}
