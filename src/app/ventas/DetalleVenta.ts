
export class DetalleVenta{
    constructor(public idCabecera:number,public idProducto:number,public cantidad:number,
        public precio:number,public tipo_descuento: string,
        public descuento:number, public sub_total: number){
        
    }
}