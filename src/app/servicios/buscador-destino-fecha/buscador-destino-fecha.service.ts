import { Injectable } from '@angular/core';
import { Actividades } from '../../models/actividades.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorDestinoFechaService {
  private porFechaYDestinoURL = "http://localhost:8080/actividades/buscar";

  constructor(private http: HttpClient) {}

  obtenerActividadesPorFechaYDestino(nombreDestino: string, fecha: string): Observable<Actividades[]> {
    const body = { nombre_destino: nombreDestino, fecha: fecha };
    return this.http.post<Actividades[]>(this.porFechaYDestinoURL, body);
  }
}
