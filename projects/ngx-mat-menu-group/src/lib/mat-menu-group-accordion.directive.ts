import { ContentChildren, Directive, QueryList } from '@angular/core';
import { NgxMatMenuGroupTrigger } from "./ngx-mat-menu-group-trigger";
import { MatMenu } from "@angular/material/menu";
import { MatMenuGroupComponent } from "./mat-menu-group.component";
import { takeUntil, tap } from "rxjs/operators";

@Directive({
  selector: '[ngxMatMenuGroups]',
  exportAs: 'ngxMatMenuGroups'
})
export class MatMenuGroupsDirective {

  @ContentChildren(NgxMatMenuGroupTrigger, {descendants: false})
  menuGroupTriggers: QueryList<NgxMatMenuGroupTrigger> = new QueryList();

  @ContentChildren(MatMenuGroupComponent, {descendants: false})
  menuGroupItems: QueryList<MatMenuGroupComponent> = new QueryList();

  constructor(
    private _matMenu: MatMenu
  ) {
  }

  closeAll() {
    this.menuGroupTriggers.forEach(item => {
      item.close();
    });
  }

  closeOthers(item: NgxMatMenuGroupTrigger) {
    this.menuGroupTriggers.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.close();
      }
    });
  }

}
