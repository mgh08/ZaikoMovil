import {Component, OnInit} from '@angular/core'
import {Router} from "@angular/router";
import {ApiService} from './api.service';
import {Dialogs} from '@nativescript/core'
import {ActivatedRoute} from '@angular/router';
import {map, filter, scan} from 'rxjs/operators';
import {TextField} from "@nativescript/core/ui/text-field";


@Component({
  selector: 'productos-editar',
  templateUrl: './productos-editar.html',
})
export class ProductosEditarComponent {
  id: number;
  nombre: string;
  cantidad: string;
  precio: string;
  categorias: string;
  unidad_medida: string;
  lote: string;
  fecha_vencimiento: string;
  boton: string;
  foto: string;

  public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams
      .subscribe((params) => {
          if (params.id) {
            this.boton = "Actualizar";
            this.id = params.id;
            this.apiService.getRegisterById(params.id).subscribe((res) => {
              console.info(res)
              this.nombre = res.nombre;
              this.cantidad = res.cantidad;
              this.precio = res.precio;
              this.categorias = res.categorias;
              this.unidad_medida = res.unidad_medida;
              this.lote = res.lote;
              this.fecha_vencimiento = res.fecha_vencimiento;
            }, error => {
              console.log(error.status)
              if (error.status == 400) {
                Dialogs.alert({
                  title: 'Respuesta:',
                  message: error.error.message,
                  okButtonText: 'OK',
                  cancelable: true,
                });
              } else {
                Dialogs.alert({
                  title: 'Respuesta:',
                  message: error.message,
                  okButtonText: 'OK',
                  cancelable: true,
                });
              }

            });

          } else {
            console.log("Nuevo....")
            this.boton = "Crear";
          }
        }
      );
  }

  public actualizarRegistro() {
    console.log("prueba...")
    let data = {
      nombre: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio,
      categorias: this.categorias,
      unidad_medida: this.unidad_medida,
      lote: this.lote,
      fecha_vencimiento: this.fecha_vencimiento
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
      this.router.navigate(['productos']);
    });
  }

  inputChange(args, campo) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;
    if (campo == "nombre") {
      this.nombre = textField.text;
    } else if (campo == "cantidad") {
      this.cantidad = textField.text;
    } else if (campo == "precio") {
      this.precio = textField.text;
    } else if (campo == "categorias") {
      this.categorias = textField.text;
    } else if (campo == "unidad_medida") {
      this.unidad_medida = textField.text;
    } else if (campo == "lote") {
      this.lote = textField.text;
    } else if (campo == "fecha_vencimiento") {
      this.fecha_vencimiento = textField.text;
    }
  }

  public guardarRegistro() {
    let data = {
      nombre: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio,
      categorias: this.categorias,
      unidad_medida: this.unidad_medida,
      lote: this.lote,
      fecha_vencimiento: this.fecha_vencimiento
    };
    console.log(data)
    this.apiService.addRegister(data).subscribe((res) => {
      console.info("ok")
      Dialogs.alert({
        title: 'Detalles!',
        message: 'Producto creado correctamente!!',
        okButtonText: 'OK',
        cancelable: true,
      });
      this.router.navigate(['productos']);
    });
  }

  public operar(){
    if (this.boton == "Crear") {
      this.guardarRegistro();
    } else if (this.boton == "Actualizar") {
      console.log("intento actualizar")
      this.actualizarRegistro();
    }
  }
}

