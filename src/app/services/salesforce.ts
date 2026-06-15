import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Opportunity, OpportunityResponse } from '../models/salesforce';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalesforceService {
  private http   = inject(HttpClient);
  private apiUrl = environment.apiUrl;

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
