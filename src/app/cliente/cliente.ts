
export class Cliente{
    id:number;
    nombres:string;
    dni: string;
    app:string;
    apm:string;
    genero: string;
    estado: string = 'ACTIVO';
    constructor(nombres:string,dni:string,app:string,apm:string,genero:string){
        this.nombres = nombres;
        this.dni = dni;
        this.app = app;
        this.apm = apm;
        this.genero = genero;
    }
}