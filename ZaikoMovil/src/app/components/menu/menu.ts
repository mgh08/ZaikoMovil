import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { exit } from "nativescript-exit";
import {GestureEventData} from "@nativescript/core";
import {Label} from "@nativescript/core/ui/label";

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
})
export class MenuComponent {
  public constructor(private router: Router) {
    // Use the component constructor to inject providers.
  }

  public onExit(): void {
    exit(); // will close application
  }

  public onLabelTap(args) {
      const label = args.view as Label;
  }
}
