import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { Dialogs } from '@nativescript/core'
import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { TextField } from "@nativescript/core/ui/text-field";


@Component({
    selector: 'pedidos-editar',
    templateUrl: './pedidos-editar.html',
})
export class PedidosEditarComponent {
    id: number;
    cantidad: string;
    precio_unitario: string;
    productos: string;
    clientes: string;
    fecha_pedido: string;
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
                    this.cantidad = res.cantidad;
                    this.precio_unitario = res.precio_unitario;
                    this.productos = res.productos;
                    this.clientes = res.clientes;
                    this.fecha_pedido = res.fecha_pedido;
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
            cantidad: this.cantidad,
            precio_unitario: this.precio_unitario,
            productos: this.productos,
            clientes: this.clientes,
            fecha_pedido: this.fecha_pedido
        };
        console.log(this.id)
        console.log(data)
        this.apiService.updateRegister(this.id, data).subscribe((res) => {
            console.info("ok")
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Pedido actualizado correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['pedidos']);
        });
    }

    inputChange(args, campo) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        if (campo == "cantidad"){
            this.cantidad = textField.text;
        }
        else if(campo == "precio_unitario"){
            this.precio_unitario = textField.text;
        }
        else if(campo == "productos"){
            this.productos = textField.text;
        }
        else if(campo == "clientes"){
            this.clientes = textField.text;
        }
        else if(campo == "fecha_pedido"){
            this.fecha_pedido = textField.text;
        }
    }

    public guardarRegistro(){
        let data = {
            cantidad: this.cantidad,
            precio_unitario: this.precio_unitario,
            productos: this.productos,
            clientes: this.clientes,
            fecha_pedido: this.fecha_pedido
        };
        console.log(data)
        this.apiService.addRegister(data).subscribe((res) => {
            console.info("ok")
            Dialogs.alert({
                title: 'Detalles!',
                message: 'Pedido creado correctamente!!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['pedidos']);
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

