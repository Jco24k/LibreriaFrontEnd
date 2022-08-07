import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/producto.service';
import { VentasCarritoService } from 'src/app/ventas-carrito.service';
import Swal from 'sweetalert2';
import { DetalleVenta } from '../DetalleVenta';

@Component({
  selector: 'app-listar-pro',
  templateUrl: './listar-pro.component.html',
  styleUrls: ['./listar-pro.component.css']
})
export class ListarProComponent implements OnInit {
  @ViewChild('producto_buscar') producto_buscar: ElementRef;
  @ViewChild('descuento_pro') descuento_pro: ElementRef;
  @ViewChild('tipo_descuento') tipo_descuento: ElementRef;


  lista_productos : Producto[] = [];
  consultas_pro : Producto[]=[];
  constructor(private productoService:ProductoService, private ventaService:VentasCarritoService) { }

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe((res)=>{
      this.ventaService.cargarListaProductos(res);
      this.lista_productos = this.ventaService.lista_productos;
      this.consultas_pro = this.lista_productos;
    })
  }

  
  buscarProducto():void{
    var producto_buscar =this.producto_buscar.nativeElement.value;
    var busqueda =  this.lista_productos.filter(pro => pro.nombre.substring(0,producto_buscar.length).toLowerCase() == producto_buscar.toLowerCase() );
    this.consultas_pro = busqueda;
  }

  agregarProducto(pro:Producto):void{
    if(pro.stock != 0){
      let cantidad = 1;
      let precio = pro.precio;
      let t_des = this.tipo_descuento.nativeElement.value;
      let descuento = parseFloat(this.descuento_pro.nativeElement.value);
      let subtotal = this.ventaService.CalcularSubtotal(t_des,precio,cantidad,descuento);
      this.ventaService.aumentarDetalleVenta(new DetalleVenta(pro,cantidad,precio,t_des,descuento,subtotal));
      this.producto_buscar.nativeElement.value = "";
    }else{
      Swal.fire({icon: 'error',title: 'PRODUCTO SELECCIONADO SIN STOCK!',text: 'Seleccione otro producto'});
    }
  }

  
}
