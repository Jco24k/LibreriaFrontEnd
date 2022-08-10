
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { ProductoService } from 'src/app/producto/producto.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import Swal from 'sweetalert2';
import { AlmacenService } from '../almacen/Almacen.service';
import { DetalleAlmacen } from '../almacen/detallealmacen';
import { Usuario } from '../usuario/usuario';
import { VentasCarritoService } from '../ventas-carrito.service';
import { CabeceraVenta } from './CabeceraVenta';
import { DetalleProVenta } from './DetalleProductoVenta';
import { DetalleVenta } from './DetalleVenta';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  today: Date = new Date();
  zon = new DatePipe('en-US');
  fecha_actual = this.zon.transform(Date.now(), 'yyyy-MM-dd')
  usuario_sistema : Usuario;

  datos_cli:string = "";
  @ViewChild('producto_buscar') producto_buscar: ElementRef;
  lista_compras : DetalleProVenta[] ;
  public formularioVentas: FormGroup;
  
  
  constructor(private ventaService:VentasCarritoService, private clienteService:ClienteService,
    private usuarioService:UsuarioService,private productoService:ProductoService,private almacenService:AlmacenService) { }
  
  ngOnInit(): void {
    this.formularioVentas = this.crearFormulario();
    this.formularioVentas.controls['fecha_emision'].setValue(this.fecha_actual);
    this.buscarUsuario();
    this.lista_compras = this.ventaService.carrito_ventas;
  }

  crearFormulario(){
    return new FormGroup({
      cliente: new FormControl('',[Validators.required,Validators.min(10000000),Validators.max(99999999)]),
      fecha_emision: new FormControl('',[Validators.required]),

    });
  }
  get cliente(){return this.formularioVentas.get('cliente')}
  get fecha_emision(){return this.formularioVentas.get('fecha_emision')}



  buscarCliente():void{
    if(this.cliente?.value.toString().length !=8){
      Swal.fire({icon: 'error',title: 'ERROR EN EL DNI!',text: 'El DNI debe contener 8 digitos'});
      this.datos_cli = "";
    }else{
      this.clienteService.Obtener_x_dni(this.cliente?.value).subscribe((response) => {
        if(response) {this.datos_cli = response.nombres + " "+response.app+" "+response.apm}
        else{
          Swal.fire({icon: 'error',title: 'DNI NO ENCONTRADO!',text: 'Digite otro DNI o primero registre al cliente'});
          this.formularioVentas.controls['cliente'].setValue("");
          this.datos_cli = "";
        }
      });
    }
  }

  buscarUsuario():void{
    this.usuarioService.Buscar_x_username('jesus123').subscribe((res)=>{
      if(res) {this.usuario_sistema = res}
      else Swal.fire({icon: 'error',title: 'USUARIO NO ENCONTRADO!',text: 'NO PUEDE REALIZAR LA COMPRA'});
    })
  }
  aumentarDetalleVenta(det:DetalleProVenta):void{
  if(det.producto.stock !=0){
    this.ventaService.aumentarDetalleVenta(det);
  }else{
    Swal.fire({icon: 'error',title: 'PRODUCTO SELECCIONADO SIN STOCK!',text: 'Seleccione otro producto'});
  }
  }
  disminuirDetalleVenta(det:DetalleProVenta):void{
    this.ventaService.disminuirDetalleVenta(det);
  }

  calcularTotal():number{
    return this.ventaService.calcularTotal();
  }

  generarVenta():void{
    if(this.ventaService.carrito_ventas.length != 0){
        if(this.cliente?.valid && this.datos_cli != ""){
          this.clienteService.Obtener_x_dni(this.cliente?.value).subscribe((cliente) => {
            var cabVenta = new CabeceraVenta(this.usuario_sistema,cliente,this.ventaService.calcularTotal(),this.fecha_actual);
            this.ventaService.guardarCabeceraVenta(cabVenta).subscribe(
              cab => {
                this.ventaService.carrito_ventas.forEach(pro => {
                  var detalle = new DetalleVenta(cab.id,pro.producto.id,pro.cantidad,pro.precio,pro.tipo_descuento,pro.descuento,pro.subtotal)
                  console.log("Cantidad Comprado: "+pro.cantidad +",Stock: "+ pro.producto.stock)
                  
                   this.ventaService.guardarDetalleVenta(detalle).subscribe( res =>{
                    this.productoService.BuscarProducto(pro.producto.id).subscribe(encontradoPro =>{
                      encontradoPro.stock -= pro.cantidad;
                      this.productoService.ActualizarProducto(encontradoPro,encontradoPro.id).subscribe(res=>console.log(res))
                      var det_almacen = new DetalleAlmacen(); 
                      det_almacen.cantidad = pro.producto.stock;
                      this.almacenService.ActualizarDetalleAlmacen(det_almacen,"principal",pro.producto.id).subscribe(de =>console.log(de));
                    })
                  })
                });
                
                 Swal.fire({icon: 'success',title: 'REGISTRO EXITOSO!',text: 'Compra realizado correctamente'}).then((result) => {
                  if (result.isConfirmed) {
                    this.reiniciarDatos();
                    window.location.reload();
                  }});;
              }
            )
          });
          
          // CabeceraVenta cabVenta = new CabeceraVenta(this.usuario_sistema,this.cliente_venta,);
        }else{
          Swal.fire({icon: 'info',title: 'ERROR EN EL DNI DE CLIENTE!',text: 'Debe registrar un dni valido y relizar la busqueda'});
          
        }
      }
    else{
      Swal.fire({icon: 'info',title: 'NO AGREGO NINGUN PRODUCTO!',text: 'Debe agrear al menos un producto a la compra'});
    }
  }

  reiniciarDatos():void{
    this.productoService.listarProductosAlmacen('principal').subscribe((res)=>{
      this.ventaService.cargarListaProductos(res);
    })
    this.ventaService.reiniciarCarroVenta();
    this.datos_cli = "";
    this.formularioVentas.controls['cliente'].setValue("");
  }

  eliminarCompraItem(index:number){
    
    Swal.fire({
      title: 'Eliminar Producto de la Compra!',
      text: "Esta seguro de eliminar este Producto?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.eliminarCompraItem(index);
      }
    })

  }
}
