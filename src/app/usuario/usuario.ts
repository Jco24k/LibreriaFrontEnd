import { Rol } from "./rol";

export class Usuario{
    id:number;
    dni: string;
    nombres:string | undefined;
    app:string | undefined;
    apm:string | undefined;
    fecha:string | undefined;
    correo:string | undefined;
    tel:string | undefined;
    foto:string | undefined;
    username:string | undefined;
    password:string | undefined;
    rol:Rol 
    genero: string | undefined;
    estado: string = 'ACTIVO';
}