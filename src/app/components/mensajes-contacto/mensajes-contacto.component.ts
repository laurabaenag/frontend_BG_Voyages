import { Component, OnInit } from '@angular/core';
import { Mensajes } from '../../models/mensajes.model';
import { MensajesContactoService } from '../../servicios/mensajes-contacto/mensajes-contacto.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mensajes-contacto',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './mensajes-contacto.component.html',
  styleUrl: './mensajes-contacto.component.css'
})
export class MensajesContactoComponent {
  mensajes: Mensajes[] = [];

  constructor(
    private mensajeService: MensajesContactoService,
  ) {}

  ngOnInit(): void {
    this.mensajeService.obtenerAllMensajes().subscribe((data) => {
      this.mensajes = data;
    });

  }
}
