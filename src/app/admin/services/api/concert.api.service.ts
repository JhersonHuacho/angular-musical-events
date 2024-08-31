import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConcertGetApiResponse, ConcertPostApiRequest, ConcertPostApiResponse } from '../../../shared/models/concert.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConcertApiService {

  private baseUrl = environment.baseUrl;
  httpClient = inject(HttpClient);

  getConcerts(): Observable<ConcertGetApiResponse> {
    const apiUrl = this.baseUrl + '/api/events';
    return this.httpClient.get<ConcertGetApiResponse>(apiUrl);
  }
  postConcert(requestBody: ConcertPostApiRequest): Observable<ConcertPostApiResponse> {
    const apiUrl = this.baseUrl + '/api/events';
    return this.httpClient.post<ConcertPostApiResponse>(apiUrl, requestBody);
  }
}
