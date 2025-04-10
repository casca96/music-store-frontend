import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ){}

  getArtists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/artists`);
  }

  getInstruments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/instruments`);
  }

  getInstrumentByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/instruments/category/${category}`);
  }

  getContactInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contact`);
  }
  submitContactData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact/`, data); // URL + BODY
  }
}
