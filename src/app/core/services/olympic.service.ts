import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { OlympicError } from '../errors/olympic-error';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[] | undefined | null>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<OlympicCountry[] | null> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next(null);
        const message = 'An error occurred while fetching Olympic data. Please try again later.';
        return throwError(() => new OlympicError(message));
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
