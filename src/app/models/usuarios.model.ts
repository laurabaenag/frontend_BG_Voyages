export interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  esAdmin: boolean;
}

export interface LoginUsuario extends Pick<Usuarios, 'email' | 'password'> {}

export interface RegistroUsuario extends Pick<Usuarios, 'nombre' | 'apellido' | 'email' | 'password'> {}

export interface LoginResponse {
  nombre: string;
  isAdmin: boolean;
  idUsuario: number;
  email: string;
  apellido: string;
}

