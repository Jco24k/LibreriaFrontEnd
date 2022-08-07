import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint:string ='http://localhost:9090/api/productos'
  
  constructor(private http:HttpClient) {
    
   }

 
  listarProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  BuscarProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(this.urlEndPoint+"/"+id);
  }

  Buscar_x_nombre(nombre:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint+"/nombre/"+nombre);
  }
  
  ActualizarProducto(producto:Producto,id: Number):Observable<Producto>{
    return this.http.put<Producto>(this.urlEndPoint+'/'+id,producto)
  }

}
