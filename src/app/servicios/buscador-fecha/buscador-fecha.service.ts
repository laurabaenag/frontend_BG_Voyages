import { Injectable } from '@angular/core';
import { Actividades } from '../../models/actividades.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorFechaService {
  private porFechaURL = "http://localhost:8080/actividades/buscar/porFecha";

  constructor(private http: HttpClient) {}

  obtenerActividadesPorFecha(fecha: string): Observable<Actividades[]> {
    const body = { fecha: fecha };
    return this.http.post<Actividades[]>(this.porFechaURL, body);
  }
}
