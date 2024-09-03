import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core'


@Component({
    selector: 'productos',
    templateUrl: './productos.html',
})
export class ProductosComponent {
    rol: string;
    nombreCompleto: string;
    foto: string;
    perfil;
    productos: any[];
    public constructor(private router: Router, private apiService: ApiService) {
        // Use the component constructor to inject providers.
        this.obtenerTodos();
        // Use the component constructor to inject providers.
        console.log("home")
        console.info("Averiguando si hay datos...");
        if (localStorage.getItem('sena.token')){
            this.perfil = JSON.parse( localStorage.getItem('sena.user'))
            console.log("Bienvenido "+this.perfil.nombreCompleto+"!!");
            this.rol = this.perfil.rol
            this.nombreCompleto = this.perfil.nombreCompleto
            this.foto = "http://zaikofactory.pythonanywhere.com"+this.perfil.foto
        }
        else{
            this.rol = ""
            this.nombreCompleto = ""
            this.foto = ""
            this.router.navigate(['login']);
        }
    }

    public obtenerTodos(){
        this.apiService.getRegisters().subscribe((data: any[]) => {
            //console.log(data);
            this.productos = data;
        });
    }

    onItemTap(args) {
        let register = this.productos[args.index]
        //console.log(`Index: ${args.index}; Item: ${register.id}`);
        //console.log(`ID: ${register.id} - NOMBRE: ${register.nombre_cat} - DESCRCIPCIÓN: ${register.desc} `)

        //Consultar por ID en la API
        this.apiService.getRegisterById(register.id).subscribe((res) => {
            Dialogs.alert({
                title: 'Detalles!',
                message: `ID: ${res.id}\nNOMBRE:${res.nombre} \nCantidad: ${res.cantidad} \nPrecio:${res.precio} \nCategoria:${res.categorias} \nUnidad Medida:${res.unidad_medida} \nLote:${res.lote} \nFecha Vencimiento:${res.fecha_vencimiento} \nFoto:${res.foto}`,
                okButtonText: 'OK',
                cancelable: true,
            });
            console.info(res)
        });
    }

    public eliminarCat(item){
        Dialogs.confirm({
            title: 'Confirmación',
            message: 'Está seguro de eliminar este registro ?',
            okButtonText: 'SI',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancelar',
            })
            .then((result) => {
                console.log(result);
                if (result){
                    this.apiService.deleteRegister(item.id).subscribe((res: string) => {
                        Dialogs.alert({
                            title: 'Respuesta:',
                            message: "Producto eliminado correctamente!!",
                            okButtonText: 'OK',
                            cancelable: true,
                        });
                        this.obtenerTodos();
                    },error => {
                        console.log(error.status)
                        if (error.status == 400){
                            Dialogs.alert({
                                title: 'Respuesta:',
                                message: error.error.message,
                                okButtonText: 'OK',
                                cancelable: true,
                            });
                        }
                        else{
                            Dialogs.alert({
                                title: 'Respuesta:',
                                message: error.message,
                                okButtonText: 'OK',
                                cancelable: true,
                            });
                        }

                    });
                }
            });

    }

    public editarCat(item){
        console.log(`Editar cat: ${item.id}`)
        this.router.navigate(['productos-editar'], { queryParams: { id: item.id } });
    }

    public agregarCat(){
        this.router.navigate(['productos-editar']);
    }

    public verificarPermisos(...roles: string[]): boolean {
        return roles.includes(this.rol);
    }
}


