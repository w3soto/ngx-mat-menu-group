import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input, OnDestroy,
  OnInit,
  Output
} from "@angular/core";

import { NgxMatMenuGroup } from "./mat-menu-group.component";
import { Subscription } from "rxjs";


@Directive({
  selector: '[ngxMatMenuGroupTriggerFor]',
  exportAs: 'ngxMatMenuGroupTrigger',
  host: {
    class: 'ngx-mat-menu-group-trigger'
  }
})
export class NgxMatMenuGroupTrigger implements OnInit, OnDestroy {

  @Input('ngxMatMenuGroupTriggerFor')
  set menuGroup(menuGroup: NgxMatMenuGroup) {
    if (this._menuGroup === menuGroup) {
      return;
    }

    this._menuGroupOpenSub?.unsubscribe();
    this._menuGroupCloseSub?.unsubscribe();

    this._menuGroup = menuGroup;

    if (this._menuGroup) {
      this._closed = this._menuGroup.closed;
      this._menuGroupOpenSub = this._menuGroup.groupOpened.subscribe(() => this._onMenuGroupOpened());
      this._menuGroupCloseSub = this._menuGroup.groupClosed.subscribe(() => this._onMenuGroupClosed());
    }
  }
  private _menuGroup!: NgxMatMenuGroup;

  @Output()
  groupOpened: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  groupClosed: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.ngx-mat-menu-group-trigger-closed')
  get closed(): boolean {
    return this._closed;
  }

  private _closed: boolean = true;

  private _menuGroupOpenSub?: Subscription;
  private _menuGroupCloseSub?: Subscription;

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    e.stopPropagation();
    this.toggle();
    return false;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.code == 'Enter' || e.code == 'Space') {
      e.stopPropagation();
      this.toggle();
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this._closed = this._menuGroup.closed;
  }

  ngOnDestroy() {
    this._menuGroupOpenSub?.unsubscribe();
    this._menuGroupCloseSub?.unsubscribe();
  }

  open() {
    if (!this._closed) {
      return
    }
    this._closed = false;
    this._checkMenuGroup();
    this._menuGroup.open();
    this.groupOpened.emit();
  }

  close() {
    if (this._closed) {
      return;
    }
    this._closed = true;
    this._checkMenuGroup();
    this._menuGroup.close();
  }

  toggle() {
    if (this._closed) {
      this.open()
    }
    else {
      this.close();
    }
  }

  private _onMenuGroupOpened() {
    this._closed = false;
  }

  private _onMenuGroupClosed() {
    this._closed = true;
    this.groupClosed.emit();
  }

  private _checkMenuGroup() {
    if (!this._menuGroup) {
      throw new Error('ngxMatMenuGroupTriggerFor: must pass in an ngx-mat-menu-group instance')
    }
  }
}
