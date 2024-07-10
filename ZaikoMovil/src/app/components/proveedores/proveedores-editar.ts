import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { Dialogs } from '@nativescript/core'
import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { TextField } from "@nativescript/core/ui/text-field";


@Component({
    selector: 'proveedores-editar',
    templateUrl: './proveedores-editar.html',
})
export class ProveedorsEditarComponent {
    id: number;
    nombre: string;
    nit: string;
    telefono: string;
    correo_electronico: string;
    boton: string;
    foto: string;
    public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute ) {

        this.activatedRoute.queryParams
          .subscribe((params) => {
            if(params.id){
                this.boton = "Actualizar";
                this.id = params.id;
                this.apiService.getRegisterById(params.id).subscribe((res) => {
                    console.info(res)
                    this.nombre = res.nombre;
                    this.nit = res.nit;
                    this.telefono = res.telefono;
                    this.correo_electronico = res.correo_electronico;
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
            else{
                console.log("Nuevo....")
                this.boton = "Crear";
            }
          }
        );
    }

    public actualizarRegistro(){
        console.log("prueba...")
        let data = {
            nombre: this.nombre,
            nit: this.nit,
            telefono: this.telefono,
            correo_electronico: this.correo_electronico
        };
        console.log(this.id)
        console.log(data)
        this.apiService.updateRegister(this.id, data).subscribe((res) => {
            console.info("ok")
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Categoría actualizada correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['proveedores']);
        });
    }

    inputChange(args, campo) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        if (campo == "nombre"){
            this.nombre = textField.text;
        }
        else if(campo == "nit"){
            this.nit = textField.text;
        }
        else if(campo == "telefono"){
            this.telefono = textField.text;
        }
        else if(campo == "correo_electronico"){
            this.correo_electronico = textField.text;
        }
    }

    public guardarRegistro(){
        let data = {
            nombre: this.nombre,
            nit: this.nit,
            telefono: this.telefono,
            correo_electronico: this.correo_electronico
        };
        console.log(data)
        this.apiService.addRegister(data).subscribe((res) => {
            console.info("ok")
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Proveedor creado correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['proveedores']);
        });
    }

    public operar(){
        if (this.boton == "Crear"){
            this.guardarRegistro();
        }
        else if(this.boton == "Actualizar"){
            console.log("intento actualizar")
            this.actualizarRegistro();
        }
    }
}

