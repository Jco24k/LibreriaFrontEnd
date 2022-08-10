import { Cliente } from "../cliente/cliente";
import { Usuario } from "../usuario/usuario";


export class CabeceraVenta{
    public id:number;
    constructor(public usuario:Usuario,
        public cliente:Cliente,public total: number,
        public fecha_emision: string |null){
        
    }
}