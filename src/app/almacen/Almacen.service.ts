import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleAlmacen } from './detallealmacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private urlEndPoint:string ='http://localhost:9090/api/almacen'
  constructor(private http:HttpClient) { }

 
  listarDetalleAlmacen():Observable<DetalleAlmacen[]>{
    return this.http.get<DetalleAlmacen[]>(this.urlEndPoint);
  }

  listarProductosDetalleAlmacen(nombre: String):Observable<DetalleAlmacen[]>{
    return this.http.get<DetalleAlmacen[]>(this.urlEndPoint+'/productos/nombre/'+nombre);
  }
  guardarClientes(det:DetalleAlmacen):Observable<DetalleAlmacen>{
    return this.http.post<DetalleAlmacen>(this.urlEndPoint,det);
  }

  ActualizarDetalleAlmacen(det:DetalleAlmacen,nombreAlmacen: String,id_producto:Number):Observable<DetalleAlmacen>{
    return this.http.put<DetalleAlmacen>(this.urlEndPoint+'/'+nombreAlmacen+'/'+id_producto,det)
  }

}
