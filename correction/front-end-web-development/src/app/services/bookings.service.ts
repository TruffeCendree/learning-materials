import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings$CoverageParams, Bookings$CoverageResponse } from '@backend/routes/api/bookings/post.coverage.interfaces';
import { Bookings$ProposalsParams, Bookings$ProposalsResponse } from 'src/dist-typings/routes/api/bookings/post.proposals.interfaces';

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

  proposals (body: Bookings$ProposalsParams) {
    return this.httpClient.post('/api/bookings/proposals', body).toPromise() as any as Bookings$ProposalsResponse;
  }
}
