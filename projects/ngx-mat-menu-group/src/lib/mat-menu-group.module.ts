import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";

import { NgxMatMenuGroup } from './mat-menu-group.component';
import { NgxMatMenuGroupTrigger } from "./mat-menu-group-trigger.directive";
import { NgxMatMenuGroupAccordion } from './mat-menu-group-accordion.directive';


@NgModule({
  declarations: [
    NgxMatMenuGroup,
    NgxMatMenuGroupTrigger,
    NgxMatMenuGroupAccordion
  ],
  imports: [
    MatMenuModule
  ],
  exports: [
    NgxMatMenuGroup,
    NgxMatMenuGroupTrigger,
    NgxMatMenuGroupAccordion
  ]
})
export class NgxMatMenuGroupModule { }
