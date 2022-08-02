import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  clientes: Cliente[]=[];

  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe(
      clis=>{this.clientes = clis}
  );
  }

  eliminar(cliente:Cliente):void{
    this.clienteService.EliminarCliente(cliente.id).subscribe(
      res => this.clienteService.listarClientes().subscribe(
        response => this.clientes = response
      )
        )

  }
}
