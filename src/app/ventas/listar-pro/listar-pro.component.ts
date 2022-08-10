import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/producto.service';
import { VentasCarritoService } from 'src/app/ventas-carrito.service';
import Swal from 'sweetalert2';
import { DetalleProVenta } from '../DetalleProductoVenta';

@Component({
  selector: 'app-listar-pro',
  templateUrl: './listar-pro.component.html',
  styleUrls: ['./listar-pro.component.css']
})
export class ListarProComponent implements OnInit {
  @ViewChild('producto_buscar') producto_buscar: ElementRef;
  @ViewChild('descuento_pro') descuento_pro: ElementRef;
  @ViewChild('tipo_descuento') tipo_descuento: ElementRef;
  producto_select:Producto;

  lista_productos : Producto[] = [];
  consultas_pro : Producto[]=[];
  constructor(private productoService:ProductoService, private ventaService:VentasCarritoService) { }

  ngOnInit(): void {
    this.productoService.listarProductosAlmacen('principal').subscribe((res)=>{
      this.ventaService.cargarListaProductos(res);
      this.consultas_pro = this.cargarListaProductos();
    })
  }
  cargarListaProductos():Producto[]{
    return this.ventaService.lista_productos;
  }
  
  buscarProducto():void{
    var producto_buscar =this.producto_buscar.nativeElement.value;
    var busqueda =  this.lista_productos.filter(pro => pro.marca.substring(0,producto_buscar.length).toLowerCase() == producto_buscar.toLowerCase() );
    this.consultas_pro = busqueda;
  }

  agregarProducto():void{
    if(this.producto_select !=null && this.producto_select != undefined){
      if(this.producto_select.stock != 0){
        let cantidad = 1;
        let precio = this.producto_select.precio;
        let t_des = this.tipo_descuento.nativeElement.value;
        let descuento = parseFloat(this.descuento_pro.nativeElement.value);
        let subtotal = this.ventaService.CalcularSubtotal(t_des,precio,cantidad,descuento);
        this.ventaService.aumentarDetalleVenta(new DetalleProVenta(this.producto_select,cantidad,precio,t_des,descuento,subtotal));
        this.producto_buscar.nativeElement.value = "";
      }else{
        Swal.fire({icon: 'error',title: 'PRODUCTO SELECCIONADO SIN STOCK!',text: 'Seleccione otro producto'});
      }
    }
  }

  seleccionarPro(pro:Producto){
    this.producto_select = pro;
  }

  
}
