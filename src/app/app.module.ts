import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule}from'@angular/common/http';
import { RouterModule,Routes } from '@angular/router';
import { UsuarioService } from './usuario/usuario.service';
import { FormularioComponent as clienteForm } from './cliente/formulario/formulario.component';
import { FormularioComponent as UsuarioForm } from './usuario/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent as ListarUsuario } from './usuario/listar/listar.component';
import { ListarComponent as ListarClientes } from './cliente/listar/listar.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListarProComponent as ListarProVenta } from './ventas/listar-pro/listar-pro.component';
import { VentasComponent  as VentasForm} from './ventas/ventas.component';
const routes:Routes=[
  {path:'',redirectTo:'inicio',pathMatch:'full'},
  {path:'cliente/formulario', component:clienteForm},
  {path:'cliente/formulario/:id', component:clienteForm},
  {path:'usuario/formulario', component:UsuarioForm},
  {path:'usuario/formulario/:id', component:UsuarioForm},
  {path:'usuario/listar', component:ListarUsuario},
  {path:'cliente/listar', component:ListarClientes},
  {path:'ventas', component:VentasForm},
  {path:'inicio', component:InicioComponent}




]
@NgModule({
  declarations: [
    AppComponent,
    clienteForm,
    UsuarioForm,
    ListarUsuario,
    ListarClientes,
    InicioComponent,
    ListarProVenta,
    VentasForm
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
