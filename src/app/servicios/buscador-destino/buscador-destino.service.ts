import { Injectable } from '@angular/core';
import { Actividades } from '../../models/actividades.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorDestinoService {
  private porDestinoURL = "http://localhost:8080/actividades/buscar/porDestino";

  constructor(private http: HttpClient) {}

  obtenerActividadesPorDestino(nombreDestino: string): Observable<Actividades[]> {
    const body = { nombre_destino: nombreDestino };
    return this.http.post<Actividades[]>(this.porDestinoURL, body);
  }
}
