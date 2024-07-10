import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import {GestureEventData} from "@nativescript/core";
import {Label} from "@nativescript/core/ui/label";

@Component({
  selector: 'graficas',
  templateUrl: './graficas.html',
})
export class GraficasComponent {
  public constructor(private router: Router) {
    // Use the component constructor to inject providers.
  }

  public onLabelTap(args: GestureEventData) {
        const label = args.view as Label;
  
  }

}
