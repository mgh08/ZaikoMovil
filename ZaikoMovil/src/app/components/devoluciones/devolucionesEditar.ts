import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { Dialogs } from '@nativescript/core';
import { ActivatedRoute } from '@angular/router';
import { TextField } from "@nativescript/core/ui/text-field";
import { map, filter, scan } from 'rxjs/operators';

@Component({
    selector: 'devolucionesEditar',
    templateUrl: './devolucionesEditar.html',
})
export class DevolucionesEditarComponent {
    id: number;
    motivo: string;
    productos: string;
    foto: string;
    boton: string;

    public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute ) {

        this.activatedRoute.queryParams
          .subscribe((params) => {
            if(params.id){
                this.boton = "Actualizar";
                this.id = params.id;
                this.apiService.getRegisterById(params.id).subscribe((res) => {
                    console.info(res);
                    this.motivo = res.motivo;
                    this.productos = res.productos;
                    this.foto = res.foto;
                }, error => {
                    console.log(error.status);
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
            else{
                console.log("Nuevo....");
                this.boton = "Crear";
            }
          }
        );
    }

    public actualizarRegistro(){
        let data = {
            motivo : this.motivo,
            productos : this.productos,
            // foto : this.foto
        };
        console.log(data);
        this.apiService.updateRegister(this.id, data).subscribe((res) => {
            console.info("ok");
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Devolucion actualizada correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['Devoluciones']);
        }, error => {
            console.log(error.status);
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

    inputChange(args, campo) {
        let textField = <TextField>args.object;
        if(campo == "motivo"){
            this.motivo = textField.text;
        }
        else if(campo == "productos"){
            this.productos = textField.text;
        }
        else if(campo == "foto"){
            this.foto = textField.text;
        }
    }
    

    public guardarRegistro(){
        let data = {
            motivo : this.motivo,
            productos : this.productos,
            foto : this.foto
        };
        console.log(data);
        this.apiService.addRegister(data).subscribe((res) => {
            console.info("ok");
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Devolucion creada correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['devoluciones']);
        });
    }

    public operar(){
        if (this.boton == "Crear"){
            this.guardarRegistro();
        }
        else if(this.boton == "Actualizar"){
            this.actualizarRegistro();
        }
    }
}
