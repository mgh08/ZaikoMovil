import { HomeComponent } from "./components/home/home";
import { TiendaComponent } from "./components/tienda/tienda";
import { RegistroComponent } from "./components/registro/registro_usuario";
import { LoginComponent} from "./components/login/login";
import { RecuperarContrasenaComponent } from "./components/recuperar_password/recuperar_contrasena";
import { GraficasComponent } from "./components/graficas/graficas";
import { AdminComponent } from "./components/admin/admin";
import { ProveedoresComponent } from "~/app/components/proveedores/proveedores";
import { ProveedorsEditarComponent } from "~/app/components/proveedores/proveedores-editar";
import { AuditoriaComponent } from "~/app/components/auditoria/auditoria";
import { MenuComponent } from "~/app/components/menu/menu";
import { ProductosComponent } from "~/app/components/productos/productos";
import { ProductosEditarComponent } from "~/app/components/productos/productos-editar";
import { CategoriasComponent } from "./components/categorias/categorias";
import { CategoriasEditarComponent } from "./components/categorias/categorias-editar";
import { ClientesComponent} from "~/app/components/clientes/clientes";
import { ClientesEditarComponent} from "~/app/components/clientes/clientes-editar";
import { MateriaPrimaComponent } from "~/app/components/materiaPrima/materiaPrima";


export const appRoutes: any = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "tienda", component: TiendaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registrar_contrasena', component: RecuperarContrasenaComponent},
  { path: "admin", component: AdminComponent },
  { path: "graficas", component: GraficasComponent },
  { path: "menu", component: MenuComponent },
  { path: "productos", component: ProductosComponent },
  { path: "productos-editar", component: ProductosEditarComponent },
  { path: "proveedores", component: ProveedoresComponent },
  { path: "proveedores-editar", component: ProveedorsEditarComponent},
  { path: "auditoria", component: AuditoriaComponent },
  { path: "categorias", component: CategoriasComponent },
  { path: "categorias-editar", component: CategoriasEditarComponent },
  { path: "clientes", component: ClientesComponent },
  { path: "clientes-editar", component: ClientesEditarComponent },
  { path: "materiaPrima", component: MateriaPrimaComponent },

];

export const appComponents: any = [
  HomeComponent,
  TiendaComponent,
  RegistroComponent,
  LoginComponent,
  RecuperarContrasenaComponent,
  MenuComponent,
  ProductosComponent,
  ProductosEditarComponent,
  ProveedoresComponent,
  ProveedorsEditarComponent,
  AuditoriaComponent,
  AdminComponent,
  GraficasComponent,
  CategoriasComponent,
  CategoriasEditarComponent,
  ClientesComponent,
  ClientesEditarComponent,
  MateriaPrimaComponent,

];
