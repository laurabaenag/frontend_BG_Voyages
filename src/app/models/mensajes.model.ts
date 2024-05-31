export interface Mensajes {
  idUsuario: Usuarios;
  telefono: string;
  mensaje: string;
  fechaEnvio: string;
}

export interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}
