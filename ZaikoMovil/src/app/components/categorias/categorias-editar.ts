import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { Dialogs } from '@nativescript/core'
import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { TextField } from "@nativescript/core/ui/text-field";


@Component({
    selector: 'categorias-editar',
    templateUrl: './categorias-editar.html',
})
export class CategoriasEditarComponent {
    id: number;
    nombre_categoria: string;
    descripcion: string;
    boton: string;
    public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute ) {

        this.activatedRoute.queryParams
          .subscribe((params) => {
            if(params.id){
                this.boton = "Actualizar";
                this.id = params.id;
                this.apiService.getRegisterById(params.id).subscribe((res) => {
                    console.info(res)
                    this.nombre_categoria = res.nombre_categoria;
                    this.descripcion = res.descripcion;
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
            nombre_categoria: this.nombre_categoria,
            descripcion: this.descripcion
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
            this.router.navigate(['categorias']);
        });
    }

    inputChange(args, campo) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        if (campo == "nombre_categoria"){
            this.nombre_categoria = textField.text;
        }
        else if(campo == "descripcion"){
            this.descripcion = textField.text;
        }
    }

    public guardarRegistro(){
        let data = {
            nombre_categoria: this.nombre_categoria,
            descripcion: this.descripcion
        };
        console.log(data)
        this.apiService.addRegister(data).subscribe((res) => {
            console.info("ok")
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Categoría creada correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['categorias']);
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

