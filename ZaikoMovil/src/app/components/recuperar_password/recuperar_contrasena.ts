import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { EventData } from "@nativescript/core/data/observable";
import { ListPicker } from "@nativescript/core/ui/list-picker";


@Component({
  selector: 'recuperar_contrasena',
  templateUrl: './recuperar_contrasena.html',
})
export class RecuperarContrasenaComponent {

  public years: Array<number> = [1980, 1990, 2000, 2010, 2020];

  public constructor(private router: Router) {
    // Use the component constructor to inject providers.
  }

  public onTap(){
    this.router.navigate(["home"]);
  }

  public onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        console.log(`index: ${picker.selectedIndex}; item" ${this.years[picker.selectedIndex]}`);
        if (this.years[picker.selectedIndex] == 2010){
          this.router.navigate(["home"]);
        }
        else if (this.years[picker.selectedIndex] == 1980){
          this.router.navigate(["recuperar_contrasena"]);
        }
    }
}

export class LoginUsuarioComponent {
    correo: string;
    contrasena: string;
}

