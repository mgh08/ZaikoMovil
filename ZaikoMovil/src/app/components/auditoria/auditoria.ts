import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import {GestureEventData} from "@nativescript/core";
import {Label} from "@nativescript/core/ui/label";
import { Color } from "@nativescript/core/color";

@Component({
  selector: 'auditoria',
  templateUrl: './auditoria.html',
})
export class AuditoriaComponent {
  public constructor(private router: Router) {
    // Use the component constructor to inject providers.
  }

  public onLabelTap(args) {
        const label = args.view as Label;
        label.color = new Color("black");
  }
  public onTap(){
    this.router.navigate(["home"]);
  }
}
