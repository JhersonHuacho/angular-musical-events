import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { emptySale, SaleApiResponse } from '../../shared/models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  loading = signal(false);

  getData(saleId: string): Observable<SaleApiResponse> {
    const apiUrl = this.baseUrl + '/api/sales/' + saleId;
    return this.http.get<SaleApiResponse>(apiUrl).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: SaleApiResponse = {
          data: emptySale,
          success: false,
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
}
