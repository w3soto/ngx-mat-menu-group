import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";

import { MatMenuGroupComponent } from './mat-menu-group.component';
import { MatMenuGroupTriggerDirective } from "./ngx-mat-menu-group-trigger";
import { MatMenuGroupAccordionDirective } from './mat-menu-groups.directive';
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    MatMenuGroupComponent,
    MatMenuGroupTriggerDirective,
    MatMenuGroupAccordionDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  exports: [
    MatMenuGroupComponent,
    MatMenuGroupTriggerDirective,
    MatMenuGroupAccordionDirective
  ]
})
export class NgxMatMenuGroupModule { }
