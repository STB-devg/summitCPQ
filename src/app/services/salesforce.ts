import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Opportunity, OpportunityResponse } from '../models/salesforce';

@Injectable({
  providedIn: 'root'
})
export class SalesforceService {
  // Change this to your Vercel production URL when deployed
  //private apiUrl = 'http://localhost:3000';

private apiUrl = 'https://config-roan.vercel.app';

  constructor(private http: HttpClient) {}

  getOpenOpportunities(ownerId: string): Observable<Opportunity[]> {
    return this.http
      .get<OpportunityResponse>(`${this.apiUrl}/api/opportunities`, {
        params: { ownerId }
      })
      .pipe(
        map(res => res.records),
        catchError(err => throwError(() => new Error(
          err.error?.error ?? err.message ?? 'Unknown error'
        )))
      );
  }
}
