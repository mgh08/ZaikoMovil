import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core'
// Lo requiero para los filtros
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'devoluciones',
    templateUrl: './devoluciones.html',
})
export class DevolucionesComponent {
    devoluciones: any[];
    mensaje: string = "";
    public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) {
        this.obtenerTodos();
    }

    public obtenerTodos(){
        this.apiService.getRegisters().subscribe((data: any[]) => {
            //console.log(data);
            this.devoluciones = data;
        });
    }

    onItemTap(args) {
        let register = this.devoluciones[args.index]
        //console.log(`Index: ${args.index}; Item: ${register.id}`);
        //console.log(`ID: ${register.id} - NOMBRE: ${register.nombre_cat} - DESCRCIPCIÓN: ${register.desc} `)

        //Consultar por ID en la API
        this.apiService.getRegisterById(register.id).subscribe((res) => {
            Dialogs.alert({
                title: 'Detalles!',
                message: `ID: ${res.id}\nMOTIVO: ${res.motivo}\nPRODUCTOS: ${res.productos}\nFOTO: ${res.foto} `,
                okButtonText: 'OK',
                cancelable: true,
            });
            console.info(res)
        });
    }

    public eliminar(item){
        Dialogs.confirm({
            title: 'Confirmación',
            message: 'Está seguro de eliminar esta devolucion ?',
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
                            message: "Devolucion eliminada correctamente!!",
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

    public editar(item){
        console.log(`Editar DEV: ${item.id}`)
        this.router.navigate(['devolucionesEditar'], { queryParams: { id: item.id } });
    }

    public agregar(){
        this.router.navigate(['devolucionesEditar']);
    }

}
