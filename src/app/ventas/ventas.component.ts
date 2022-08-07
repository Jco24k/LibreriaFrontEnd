
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/producto.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import Swal from 'sweetalert2';
import { VentasCarritoService } from '../ventas-carrito.service';
import { DetalleVenta } from './DetalleVenta';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  today: Date = new Date();
  zon = new DatePipe('en-US');
  fecha:string| null;
  datos_cli:string;
  id_usuario : number;
  @ViewChild('producto_buscar') producto_buscar: ElementRef;
  lista_compras : DetalleVenta[] ;
  public formularioVentas: FormGroup;

  constructor(private ventaService:VentasCarritoService, private clienteService:ClienteService,
    private usuarioService:UsuarioService, private productoService: ProductoService) { }
  
  ngOnInit(): void {
    this.formularioVentas = this.crearFormulario();
    this.formularioVentas.controls['fecha_emision'].setValue(this.zon.transform(Date.now(), 'yyyy-MM-dd'));
    this.buscarUsuario();
    this.lista_compras = this.ventaService.carrito_ventas;
  }

  crearFormulario(){
    return new FormGroup({
      id: new FormControl(''),
      cliente: new FormControl('',[Validators.required,Validators.min(10000000),Validators.max(99999999)]),
      app: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      fecha_emision: new FormControl('',[Validators.required]),
      apm: new FormControl('',[Validators.required,Validators.maxLength(20)])
    });
  }
  get cliente(){return this.formularioVentas.get('cliente')}
  get fecha_emision(){return this.formularioVentas.get('fecha_emision')}
  get descuento_pro(){return this.formularioVentas.get('')}



  buscarCliente():void{
    if(this.cliente?.value.toString().length !=8){
      Swal.fire({icon: 'error',title: 'ERROR EN EL DNI!',text: 'El DNI debe contener 8 digitos'});
    }else{
      this.clienteService.Obtener_x_dni(this.cliente?.value).subscribe((response) => {
        if(response) this.datos_cli = response.nombres + " "+response.app+" "+response.apm;
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
      if(res) {this.id_usuario = res.id; console.log(this.id_usuario)}
      else Swal.fire({icon: 'error',title: 'USUARIO NO ENCONTRADO!',text: 'NO PUEDE REALIZAR LA COMPRA'});
    })
  }
  aumentarDetalleVenta(det:DetalleVenta):void{
  if(det.producto.stock !=0){
    this.ventaService.aumentarDetalleVenta(det);
  }else{
    Swal.fire({icon: 'error',title: 'PRODUCTO SELECCIONADO SIN STOCK!',text: 'Seleccione otro producto'});
  }
  }
  disminuirDetalleVenta(det:DetalleVenta):void{
    this.ventaService.disminuirDetalleVenta(det);
  }
  
}
