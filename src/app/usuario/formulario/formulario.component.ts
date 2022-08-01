import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../rol';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public roles: Rol[]=[];
  public rol_encontrado: Rol;
  public titulo: string = "REGISTRAR USUARIO";
  public length_telefono = 9;
  public rol:number = 1;
  private foto_seleccionado : string = "";
  @ViewChild('genero') genero: ElementRef;

  @ViewChild("foto", {
    read: ElementRef
  }) foto: ElementRef;

  constructor(private usuarioService:UsuarioService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuarioService.getRoles().subscribe(
      roles=>{this.roles = roles}
  );
      this.cargar();
  }

  
  cargar():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id= e['id'];
        if(id){
          this.usuarioService.ObtenerUsuario(id).subscribe(
            es=>this.usuario = es
          );
          this.titulo = "Actualizar Usuario";
        }else{
          this.titulo = "Registrar Usuario";
        }
      }
    );
  }

  public guardar_usuario():void{
    this.usuario.foto =
      this.foto.nativeElement.files[0] == undefined
        ? ''
        : this.foto.nativeElement.files[0].name;
    this.usuario.genero = this.genero.nativeElement.value;
    for (let i = 0; i < this.roles.length; i++) {
      if (Number(this.roles[i].id) == this.rol) {
        this.usuario.rol = this.roles[i];
      }
    }
    if (this.usuario.id == null) {
      if (this.usuario.dni.toString().length == 8) {
        this.usuarioService.Buscar_x_dni(this.usuario.dni).subscribe((response) => {
            if (response) {
              Swal.fire({
                icon: 'error',
                title: 'DNI EXISTENTE!',
                text: 'Digite otro DNI',
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'REGISTRO CON EXISTO!',
                text: 'Usuario Registrado Correctamente',
              });
              this.usuarioService
              .guardar_usuario(this.usuario)
              .subscribe((res) => this.router.navigate(['/usuario/listar']));
            }
          });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'ERROR DNI!',
          text: 'El dni debe contener 8 caracteres',
        });
      }
    }else {
      this.usuarioService
        .ActualizarUsuario(this.usuario, this.usuario.id)
        .subscribe((response) =>{
          Swal.fire({
            icon: 'success',
            title: 'REGISTRO ACTUALIZADO CON EXITO!',
            text: 'Usuario Actualizado Correctamente',
          });
           this.router.navigate(['/usuario/listar'])});
    }
  }

    
  
}
