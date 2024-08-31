import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Genre, GenreGetApiResponse, GenrePostApiResponse } from '../../../shared/models/genre.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreApiService {

  httpClient = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getGenres(): Observable<GenreGetApiResponse> {
    const apiUrl = this.baseUrl + '/api/genres';
    return this.httpClient.get<GenreGetApiResponse>(apiUrl);
  }

  createGenre(request: Genre): Observable<GenrePostApiResponse> {
    const apiUrl = this.baseUrl + '/api/genres';
    return this.httpClient.post<GenrePostApiResponse>(apiUrl, request);
  }
}
