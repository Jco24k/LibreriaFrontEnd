import { Proveedor } from "../proveedor/proveedor";
import { TipoProducto } from "../tipo_producto/tipo_producto";

export class Producto{
    constructor(public id:number,public nombre:string,
        public descripcion:string,public stock:number,
        public precio:number,public proveedor:Proveedor,
        public tipo:TipoProducto){

    }
}