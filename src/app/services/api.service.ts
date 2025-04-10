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

  getArtistsById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/artists/${id}`);
  }

  getArtistsAlbums(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/artists/${id}/albums`);
  }

  getInstruments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/instruments`);
  }

  getInstrumentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/instruments/${id}`);
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
