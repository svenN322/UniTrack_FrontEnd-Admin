import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { Reporte } from './reporte';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/BD_PROYUSER/Admin_api.php'; // URL de tu API
  public currentUser: any = null;
  
  constructor(private http: HttpClient) { 
   
  }

  

  // Obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id=${id}`);
  }

  // Crear un nuevo usuario
  createAdmin(nombres: string, apellidos: string, correo: string, codigo_admin: string, contrasena: string, edad:string, sexo: string): Observable<any> {
    // Validar que el correo sea de @ucvvirtual.edu.pe
  if (!correo.endsWith('@ucvvirtual.edu.pe')) {
    return throwError('El correo debe ser de la universidad');
  }
  const body = {nombres, apellidos, correo, codigo_admin, contrasena, edad, sexo };
  return this.http.post<any>(this.apiUrl, body).pipe(
    catchError((error) => {
      console.error('Error al crear administrador', error);
      return throwError(error);
    })
  );  // Puedes usar comillas invertidas si prefieres: `${this.apiUrl}`
  }

  // Actualizar un usuario
  updateAdmin(id: number, nombres: string, apellidos: string, correo: string, codigo_admin: string): Observable<any> {
    const body = { action: 'update', id, nombres, apellidos, correo, codigo_admin };
    return this.http.post(`${this.apiUrl}`, body);
  }


  // Iniciar sesión de usuario
  loginUser(correo: string, contrasena: string): Observable<any> {
    const body = { action: 'login', correo, contrasena };
    return this.http.post(`${this.apiUrl}`, body);
  }

  // Establecer el usuario actual
  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.currentUser;
  }
  
  getReportes(): Observable<Reporte[]> {
    // Hacer la solicitud HTTP para obtener los reportes
    return this.http.get<Reporte[]>(`${this.apiUrl}?action=reportes`);
  }

  getReportesSalidas(): Observable<Reporte[]> {
    // Hacer la solicitud HTTP para obtener los reportes
    return this.http.get<Reporte[]>(`${this.apiUrl}?action=salidas`);
  }
  
}
