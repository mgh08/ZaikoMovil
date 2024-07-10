import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { exit } from "nativescript-exit";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin',
  templateUrl: './admin.html',
})
export class AdminComponent {
  rol: string;
  nombreCompleto: string;
  foto: string;
  perfil;
  public constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    // Use the component constructor to inject providers.
    console.log("admin")
    console.info("Averiguando si hay datos...");
    if (localStorage.getItem('sena.token')){
        this.perfil = JSON.parse( localStorage.getItem('sena.user'))
        console.log("Bienvenido "+this.perfil.nombreCompleto+"!!");
        this.rol = this.perfil.rol
        this.nombreCompleto = this.perfil.nombreCompleto
        this.foto = global.url+this.perfil.foto
    }
    else{
        this.rol = ""
        this.nombreCompleto = ""
        this.foto = ""
        this.router.navigate(['login']);
    }

  }

  public cerrarSesion(){
    console.log("Eliminar sesión...")
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public verificarPermisos(rol){
      return rol == this.rol;
  }

  public onExit(): void {
    exit(); // will close application
  }

}

