import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservas } from '../../models/reservas.model';

@Injectable({
  providedIn: 'root',
})
export class DetallesReservaService {
  private baseUrl = 'http://localhost:8080/reservas';

  constructor(private http: HttpClient) {}

  obtenerAllReservas(
  ): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(`${this.baseUrl}/todas`);
  }

  getReservasByUserId(userId: number): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(`${this.baseUrl}/mostrar/${userId}`);
  }
}