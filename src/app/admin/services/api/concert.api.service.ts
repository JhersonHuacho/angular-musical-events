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
    const apiUrl = this.baseUrl + '/api/concerts/title';
    return this.httpClient.get<ConcertGetApiResponse>(apiUrl, {
      params: {
        title: '',
        page: 1,
        RecordsPerPage: 10
      }
    });
  }
  postConcert(requestBody: ConcertPostApiRequest): Observable<ConcertPostApiResponse> {
    const apiUrl = this.baseUrl + '/api/concerts';
    const formData = new FormData();
    const formattedDate = new Date(requestBody.dateEvent).toLocaleDateString('es-PE');

    console.log("formattedDate => ",formattedDate);
    // Agregar los campos del requestBody al FormData
    formData.append('title', requestBody.title);
    formData.append('description', requestBody.description);
    formData.append('place', requestBody.place);
    formData.append('unitPrice', requestBody.unitPrice.toString());
    formData.append('genreId', requestBody.genreId.toString());
    formData.append('dateEvent', formattedDate);
    formData.append('timeEvent', requestBody.timeEvent);
    if (requestBody.imageUrl) {
      formData.append('image', requestBody.imageFile, requestBody.imageName);
    }
    formData.append('ticketsQuantity', requestBody.ticketsQuantity.toString());

    return this.httpClient.post<ConcertPostApiResponse>(apiUrl, formData);
  }
}
