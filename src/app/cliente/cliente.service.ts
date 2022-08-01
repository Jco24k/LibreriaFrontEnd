import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string ='http://localhost:9090/api/clientes'
  constructor(private http:HttpClient) { }

 
  listarClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  guardarClientes(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente);
  }

  ObtenerCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(this.urlEndPoint+"/"+id);
  }
  Obtener_x_dni(dni:String):Observable<Cliente>{
    return this.http.get<Cliente>(this.urlEndPoint+"/dni/"+dni);
  }

  ActualizarCliente(cliente:Cliente,id: Number):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndPoint+'/'+id,cliente)
  }
  EliminarCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(this.urlEndPoint+"/"+id);
  }
}
