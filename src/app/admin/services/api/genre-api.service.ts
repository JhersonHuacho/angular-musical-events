import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Genre, GenreGetApiResponse, GenrePostApiResponse } from '../../../shared/models/genre.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreApiService {

  httpClient = inject(HttpClient);

  getGenres(): Observable<GenreGetApiResponse> {
    return this.httpClient.get<GenreGetApiResponse>('/api/genres');
  }

  createGenre(request: Genre): Observable<GenrePostApiResponse> {
    return this.httpClient.post<GenrePostApiResponse>('/api/genres', request);
  }
}
