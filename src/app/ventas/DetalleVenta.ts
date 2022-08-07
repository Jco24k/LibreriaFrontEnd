import { Producto } from "../producto/producto";

export class DetalleVenta{
    public id_cabecera:number;
    constructor(public producto:Producto,public cantidad:number,
        public precio:number,public tipo_descuento: string,
        public descuento:number, public subtotal: number){
        
    }
}