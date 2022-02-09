import { AfterViewInit, ContentChildren, Directive, Input, OnDestroy, QueryList } from '@angular/core';
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";

import { NgxMatMenuGroupTrigger } from "./mat-menu-group-trigger.directive";


@Directive({
  selector: '[ngxMatMenuGroupAccordion]',
  exportAs: 'ngxMatMenuGroupAccordion'
})
export class NgxMatMenuGroupAccordion implements OnDestroy, AfterViewInit {

  @Input('ngxMatMenuGroupAccordion')
  set accordion(val: boolean | any) {
    this._accordion = coerceBooleanProperty(val);
  }
  get accordion(): boolean {
    return this._accordion;
  }
  _accordion: boolean = true;

  @ContentChildren(NgxMatMenuGroupTrigger, {descendants: false})
  menuGroupTriggers: QueryList<NgxMatMenuGroupTrigger> = new QueryList();

  private _destroyed: Subject<void> = new Subject<void>();

  constructor() {}

  ngAfterViewInit(): void {
    this.menuGroupTriggers.forEach(trigger => {
      trigger.groupOpened.pipe(
        tap(() => {
          if (this.accordion) {
            this._closeOthers(trigger);
          }
        }),
        takeUntil(this._destroyed)
      ).subscribe();
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _closeOthers(item: NgxMatMenuGroupTrigger) {
    this.menuGroupTriggers.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.close();
      }
    });
  }

}
