import { Component, ElementRef, OnInit, Type, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public cliente: Cliente ;
  public lista_clientes: Cliente[];
  public titulo: string = "Registrar Cliente";
  id_cliente : Cliente;
  @ViewChild('genero') genero: ElementRef;
  public formularioCliente : FormGroup;

  constructor(private clienteService:ClienteService, private router:Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.formularioCliente = this.crearFormulario();
  }



  public guardar_cliente():void{
    if(this.formularioCliente.valid){
      this.cliente = new Cliente(this.nombres?.value,this.dni?.value,this.app?.value,this.apm?.value,this.genero.nativeElement.value);
      console.log(this.cliente);
      if (this.cliente.dni.toString().length == 8) {
        this.clienteService.Obtener_x_dni(this.cliente.dni).subscribe((response) => {
            if (response) {
              Swal.fire({icon: 'error',title: 'DNI EXISTENTE!',text: 'Digite otro DNI'});
            } else {
              Swal.fire({icon: 'success',title: 'REGISTRO CON EXISTO!',text: 'Cliente Registrado Correctamente'});
              this.clienteService.guardarClientes(this.cliente).subscribe(
                response => this.router.navigate(['/usuario/listar']))
            }
          });
      }else{
        Swal.fire({icon: 'error',title: 'ERROR DNI!',text: 'El dni debe contener 8 caracteres'});
      }
    }else{
      Swal.fire({icon: 'error',title: 'DATOS ERRONEOS!',text: 'Debe de completar todos los campos correctamente'});
    }
  }


  crearFormulario(){
    return new FormGroup({
      nombres: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      dni: new FormControl('',[Validators.required,Validators.min(10000000),Validators.max(99999999)]),
      app: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      apm: new FormControl('',[Validators.required,Validators.maxLength(20)])
    });
  }

  get nombres(){return this.formularioCliente.get('nombres')}
  get dni(){return this.formularioCliente.get('dni')}
  get app(){return this.formularioCliente.get('app')}
  get apm(){return this.formularioCliente.get('apm')}



}
