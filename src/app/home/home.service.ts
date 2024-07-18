import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { HomeApiResponse } from './home.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = environment.baseUrl + '/api/v2/pokemon/ditto';
  http = inject(HttpClient);

  getData() {
    return this.http.get<HomeApiResponse>(this.url)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(err);
          console.log('Error fetching data ', err.status);
          return EMPTY;
        })
      );
  }
}
