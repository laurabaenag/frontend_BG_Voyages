import { Injectable } from '@angular/core';
import { RegistroUsuario, Usuarios } from '../../models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'http://localhost:8080/usuarios/guardar'; // URL del endpoint de Spring Boot

  constructor(private http: HttpClient) { }

  saveUser(user: RegistroUsuario): Observable<RegistroUsuario> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<RegistroUsuario>(this.apiUrl, user, { headers });
  }
}
