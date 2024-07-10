import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'materiaPrima',
    templateUrl: './materiaPrima.html',
})
export class MateriaPrimaComponent {
    productos: any[];
    mensaje: string = "";
    materiaPrima: any[];
    public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) {
        // Use the component constructor to inject providers.
        this.activatedRoute.queryParams
          .subscribe((params) => {
            if(params.id){
                // filtro
                console.log(`Cat para filtro: ${params.id}`)
               // this.filtroPorCat(params.id);
            }
            else{
                this.obtenerTodos();
            }
        });
    }

    public obtenerTodos(){
        this.apiService.getRegisters().subscribe((data: any[]) => {
            //console.log(data);
            this.materiaPrima = data;
        });
    }

    onItemTap(args) {
        let register = this.materiaPrima[args.index]
        //console.log(`Index: ${args.index}; Item: ${register.id}`);
        //console.log(`ID: ${register.id} - NOMBRE: ${register.nombre_cat} - DESCRCIPCIÓN: ${register.desc} `)

        //Consultar por ID en la API
        this.apiService.getRegisterById(register.id).subscribe((res) => {
            Dialogs.alert({
                title: 'Detalles!',
                message: `ID: ${res.id}\nNOMBRE: ${res.nombre}\nCATEGORÍA: ${res.categoria_name}\nMEDIDA: ${res.unidad_medida}\nLOTE: ${res.lote}\nVENCIMIENTO: ${res.fecha_vencimiento}\nCANTIDAD: ${res.cantidad}\nPRECIO: ${res.precio}\nFOTO: ${res.foto} `,
                okButtonText: 'OK',
                cancelable: true,
            });
            console.info(res)
        });
    }

    public eliminar(item){
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

}

