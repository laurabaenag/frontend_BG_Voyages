import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioBusquedaComponent } from './components/inicio-busqueda/inicio-busqueda.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NormasPrivacidadComponent } from './components/normas-privacidad/normas-privacidad.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TerminosServicioComponent } from './components/terminos-servicio/terminos-servicio.component';
import { DestinosComponent } from './components/destinos/destinos.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { DetallesReservaComponent } from './components/detalles-reserva/detalles-reserva.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { MensajesContactoComponent } from './components/mensajes-contacto/mensajes-contacto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto que redirige a la página de inicio
  { path: 'inicio', component: InicioBusquedaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'normasPrivacidad', component: NormasPrivacidadComponent },
  { path: 'terminosServicio', component: TerminosServicioComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'destinos', component: DestinosComponent },
  { path: 'reservas/:idActividad', component: ReservasComponent },
  { path: 'detallesReserva', component: DetallesReservaComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'incidencias', component: MensajesContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
