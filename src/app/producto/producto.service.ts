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

  listarProductosAlmacen(almacen:String):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint+'/almacen/'+almacen);
  }

  BuscarProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(this.urlEndPoint+"/"+id);
  }

  Buscar_x_nombre(marca:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint+"/marca/"+marca);
  }
  
  ActualizarProducto(producto:Producto,id: Number):Observable<Producto>{
    return this.http.put<Producto>(this.urlEndPoint+'/'+id,producto)
  }

}
