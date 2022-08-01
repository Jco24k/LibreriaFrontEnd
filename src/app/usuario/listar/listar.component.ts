import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  usuarios: Usuario[]=[];
  constructor(private usuarioService:UsuarioService) { }


  ngOnInit(): void {
    this.usuarioService.getUsuario().subscribe(
      usuarios=>{this.usuarios = usuarios}
  );
  }

  eliminar(usuario:Usuario):void{
    this.usuarioService.EliminarUsuario(usuario.id).subscribe(
      res => this.usuarioService.getUsuario().subscribe(
        response => this.usuarios = response
      )
        )

  }
}
