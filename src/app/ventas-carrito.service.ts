import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto/producto';
import { ProductoService } from './producto/producto.service';
import { TipoProducto } from './tipo_producto/tipo_producto';
import { CabeceraVenta } from './ventas/CabeceraVenta';
import { DetalleProVenta } from './ventas/DetalleProductoVenta';
import { DetalleVenta } from './ventas/DetalleVenta';

@Injectable({
  providedIn: 'root'
})
export class VentasCarritoService {

  
  private urlCabVent:string ='http://localhost:9090/api/cabventa'
  private urlDetVent:string ='http://localhost:9090/api/detventa'
  
  public lista_productos : Producto[] = [];
  public carrito_ventas : DetalleProVenta[]= [];
  constructor(private http:HttpClient) {
    this.carrito_ventas.splice(0,1);
   }
  

  reiniciarCarroVenta():void{
    this.carrito_ventas.splice(0,this.carrito_ventas.length);
  }   
  guardarCabeceraVenta(cabVenta:CabeceraVenta):Observable<CabeceraVenta>{
    return this.http.post<CabeceraVenta>(this.urlCabVent,cabVenta);
  }

  guardarDetalleVenta(detventa:DetalleVenta):Observable<DetalleVenta>{
    return this.http.post<DetalleVenta>(this.urlDetVent,detventa);
  }
   



   aumentarDetalleVenta(det:DetalleProVenta):void{
    this.cantidadListaProductos('sumar',det.producto)
    var agregar = true;
    for(let i = 0; i<this.carrito_ventas.length;i++){
      if(this.carrito_ventas[i].producto.id == det.producto.id && 
        this.carrito_ventas[i].tipo_descuento == det.tipo_descuento && 
        this.carrito_ventas[i].descuento == det.descuento){
        this.carrito_ventas[i].cantidad += 1;
        this.carrito_ventas[i].subtotal +=  this.CalcularSubtotal(det.tipo_descuento,det.precio,1,det.descuento);
        agregar = false;
        break;
      }
    }
    if(agregar) this.carrito_ventas.push(det);

  }
  disminuirDetalleVenta(det:DetalleProVenta):void{
    this.cantidadListaProductos('restar',det.producto)
    for(let i = 0; i<this.carrito_ventas.length;i++){
      if(this.carrito_ventas[i].producto.id == det.producto.id && 
        this.carrito_ventas[i].tipo_descuento == det.tipo_descuento && 
        this.carrito_ventas[i].descuento == det.descuento){
          if(this.carrito_ventas[i].cantidad == 1){
            this.carrito_ventas.splice(i,1); 
          }else{
            this.carrito_ventas[i].cantidad -= 1;
            this.carrito_ventas[i].subtotal -= this.CalcularSubtotal(det.tipo_descuento,det.precio,1,det.descuento);

          }
      }
    }
    
  }
  CalcularSubtotal(tipo: string,precio:number,cantidad:number,descuento:number):number{
    if(tipo == 'D'){
      return (precio * cantidad) - descuento;
    }else{
      return precio - ((precio * cantidad)*descuento / 100);
    }
  }

  cargarListaProductos(lista:Producto[]){
    this.lista_productos = lista;
  }

  cantidadListaProductos(opcion: string,pro:Producto){
    const indice: number = this.lista_productos.indexOf(pro);
    if(opcion == 'sumar')  this.lista_productos[indice].stock -= 1
    else this.lista_productos[indice].stock += 1
  }

  calcularTotal():number{
    var total = 0;
    this.carrito_ventas.forEach(det => {
      total += det.subtotal;
    });

    return total;
  }

  eliminarCompraItem(index:number):void{
    this.carrito_ventas.splice(index,1);
  }
}
