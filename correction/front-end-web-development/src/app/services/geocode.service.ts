import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface NominatimResult {
  display_name: string
  importance: number  
  lat: string
  lon: string
}

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  constructor (private httpClient: HttpClient) {}

  geocodeCity (postalAddress: string, country = 'fr'): NominatimResult[] {
    // no API call if input is too short
    if (postalAddress.length < 3) return [];

    // find OpenStreetMap nominatim API documention at https://nominatim.org/release-docs/latest/api/Search/
    return this.httpClient.get(`https://nominatim.openstreetmap.org/search?format=json&featuretype=city&countrycodes=${country}&q=${postalAddress}`).toPromise() as any;
  }
}
