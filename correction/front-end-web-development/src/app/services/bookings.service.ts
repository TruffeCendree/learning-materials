import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings$CoverageParams, Bookings$CoverageResponse } from '@backend/routes/api/bookings/post.coverage.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  constructor (private httpClient: HttpClient) {}

  /**
   * Check if zone is covered by at least one employee.
   */
  coverage (body: Bookings$CoverageParams) {
    return this.httpClient.post('/api/bookings/coverage', body).toPromise() as any as Bookings$CoverageResponse;
  }
}
