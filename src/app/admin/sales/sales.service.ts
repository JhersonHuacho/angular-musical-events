import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SalesApiResponse } from './sales.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getSales(
    dateStart: Date,
    dateEnd: Date,
    page: number,
    recordsPerPage: number
  ): Observable<SalesApiResponse> {
    //format dateStart and dateEnd to mm-dd-yyyy
    const dateStartFormatted = `${(dateStart.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateStart
      .getDate()
      .toString()
      .padStart(2, '0')}-${dateStart.getFullYear()}`;
    const formattedDateStart = new Date(dateStartFormatted).toLocaleDateString('es-PE');

    const dateEndFormatted = `${(dateEnd.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateEnd
      .getDate()
      .toString()
      .padStart(2, '0')}-${dateEnd.getFullYear()}`;
    const formattedDateEnd = new Date(dateEndFormatted).toLocaleDateString('es-PE');

    const apiUrl = new URL(this.baseUrl + '/api/sales/ListSalesByDate');
    apiUrl.searchParams.append('DateStart', formattedDateStart);
    apiUrl.searchParams.append('DateEnd', formattedDateEnd);
    apiUrl.searchParams.append('Page', page.toString());
    apiUrl.searchParams.append('RecordsPerPage', recordsPerPage.toString());

    return this.http.get<SalesApiResponse>(apiUrl.toString());
  }
}
