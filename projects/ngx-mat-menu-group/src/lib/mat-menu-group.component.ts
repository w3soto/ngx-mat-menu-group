import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding, HostListener,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';

import { MatMenuItem } from '@angular/material/menu';


@Component({
  selector: '[ngx-mat-menu-group]',
  templateUrl: './mat-menu-group.component.html',
  styleUrls: ['./mat-menu-group.component.scss'],
  host: {
    'class': 'ngx-mat-menu-group'
  },
  exportAs: 'ngxMatMenuGroup',
  animations: [
    trigger('contentAnimation', [
      state('void', style({
        'height': '0px'
      })),
      state('close', style({
        'height': '0px'
      })),
      state('open', style({
        'height': '*'
      })),
      transition('open => void', [style({ 'height': '*' })]),
      transition('open <=> close', [animate('225ms cubic-bezier(0.4,0.0,0.2,1)')]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxMatMenuGroup implements AfterContentInit, OnDestroy {

  @Output()
  groupOpened: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  groupClosed: EventEmitter<void> = new EventEmitter<void>();

  get closed(): boolean {
    return this._closed;
  }
  private _closed: boolean = true;

  @ContentChildren(MatMenuItem)
  menuItems!: QueryList<MatMenuItem>;

  @HostBinding('@contentAnimation')
  _animateTo: 'close' | 'open' = 'close';

  @HostBinding('class.ngx-mat-menu-group-closed')
  private get _classClosed() {
    return this._closed && !this._animating;
  }

  private _animating: boolean = false;
  private _menuItemsStateMap: Map<MatMenuItem, boolean> = new Map<MatMenuItem, boolean>();

  constructor() {}

  ngAfterContentInit() {
    this._saveMenuItemsState();
    this._disableMenuItems();
  }

  ngOnDestroy() {
    this._loadMenuItemsState();
  }

  open() {
    if (!this._closed || this._animating) {
      return
    }
    this._loadMenuItemsState();
    this._closed = false;
    this._startAnimation('open');
    this.groupOpened.emit();
  }

  close() {
    if (this._closed || this._animating) {
      return
    }
    this._disableMenuItems();
    this._closed = true;
    this._startAnimation('close');
    this.groupClosed.emit();
  }

  toggle() {
    this._closed ? this.open() :  this.close();
  }

  // save initial MatMenu's items disabled settings
  private _saveMenuItemsState() {
    this.menuItems.forEach(o => {
      this._menuItemsStateMap.set(o, o.disabled);
    });
  }

  // restore initial MatMenu's items disabled settings
  private _loadMenuItemsState() {
    this.menuItems.forEach(o => {
      o.disabled = !!this._menuItemsStateMap.get(o);
    });
  }

  // disable all MatMenu's items so MatMenu's KeyManager will skip them
  private _disableMenuItems() {
    this.menuItems.forEach(o => {
      o.disabled = true;
    });
  }

  private _startAnimation(state: 'open' | 'close') {
    this._animating = true;
    this._animateTo = state;
  }

  @HostListener('@contentAnimation.done', ['$event'])
  private _endAnimation(e: AnimationEvent) {
    this._animating = false;
  }

}
