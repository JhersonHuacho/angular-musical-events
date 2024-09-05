import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EventDetailApiResponse } from '../../shared/models/event-detail.model';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getData(id: string): Observable<EventDetailApiResponse> {
    const apiUrl = this.baseUrl + '/api/concerts/' + id;
    return this.http.get<EventDetailApiResponse>(apiUrl);
  }
}
