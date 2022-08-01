import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { Rol } from './rol';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string ='http://localhost:9090/api/usuarios'
  private urlRoles:string ='http://localhost:9090/api/roles'



  constructor(private http:HttpClient) { }
  getUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  guardar_usuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint,usuario)
  }

  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlRoles);
  }

  ObtenerUsuario(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlEndPoint+"/"+id);
  }
  ObtenerRol(id:number):Observable<Rol>{
    return this.http.get<Rol>(this.urlRoles+"/"+id);
  }

  ActualizarUsuario(usuario:Usuario,id: Number):Observable<Usuario>{
    return this.http.put<Usuario>(this.urlEndPoint+'/'+id,usuario)
  }
  Buscar_x_dni(dni: String):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlEndPoint+'/dni/'+dni);
  }
  EliminarUsuario(id:number):Observable<Usuario>{
    return this.http.delete<Usuario>(this.urlEndPoint+"/"+id);
  }
}
