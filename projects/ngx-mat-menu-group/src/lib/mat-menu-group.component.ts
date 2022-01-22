import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { animate, AnimationEvent, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from "@angular/cdk/coercion";

import { MatMenuItem } from '@angular/material/menu';


@Component({
  selector: 'ngx-mat-menu-group, [ngx-mat-menu-group]',
  templateUrl: './mat-menu-group.component.html',
  styleUrls: ['./mat-menu-group.component.scss'],
  host: {
    'class': 'ngx-mat-menu-group ngx-mat-menu-group--closed'
  },
  animations: [
    trigger('contentAnimation', [
      state('close', style({
        'height': '0px'
      })),
      state('open', style({
        'height': AUTO_STYLE
      })),
      transition('* => void', [style({'height': '0px'})]),
      transition('close <=> open', [animate('225ms cubic-bezier(0.4,0.0,0.2,1)')])
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MatMenuGroupComponent implements AfterContentInit {

  @Output('opened')
  private _openedEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('closed')
  private _closedEvent: EventEmitter<void> = new EventEmitter<void>();
  @ContentChildren(MatMenuItem)
  private _menuItems!: QueryList<MatMenuItem>;
  private _menuItemsOriginStateMap: Map<MatMenuItem, boolean> = new Map<MatMenuItem, boolean>();

  constructor(
    readonly host: ElementRef,
    private _renderer: Renderer2
  ) {
  }

  private _closed: boolean = true;

  get closed(): boolean {
    return this._closed;
  }

  @Input()
  set closed(closed: boolean) {
    this._closed = coerceBooleanProperty(closed);
  }

  @HostBinding('@contentAnimation')
  get _contentAnimationState() {
    return this._closed ? 'close' : 'open';
  }

  ngAfterContentInit() {
    if (this._closed) {
      this.close();
    }
  }

  @HostListener('@contentAnimation.done', ['$event'])
  _contentAnimationDone(e: AnimationEvent) {
    console.log('animation done: ', e.fromState, ' => ', e.toState, ' (is closed=' + this.closed + ')')
    if (e.toState == 'close') {
      this._renderer.addClass(this.host.nativeElement, 'ngx-mat-menu-group--closed');
      this._closedEvent.emit();
    }
    if (e.toState == 'open') {
      this._openedEvent.emit();
    }
    if (e.toState == 'void') {
      this._renderer.addClass(this.host.nativeElement, 'ngx-mat-menu-group--closed');
    }
  }

  open() {
    // renew disabled settings
    this._menuItems.forEach(o => {
      o.disabled = !!this._menuItemsOriginStateMap.get(o);
    });
    this._renderer.removeClass(this.host.nativeElement, 'ngx-mat-menu-group--closed');
    this._closed = false;
  }

  close() {
    // save disabled settings and disable all MatMenu's items so MatMenu's KeyManager will skip them
    this._menuItems.forEach(o => {
      this._menuItemsOriginStateMap.set(o, o.disabled);
      o.disabled = true;
    });
    this._closed = true;
  }

  toggle() {
    if (this._closed) {
      this.open();
    } else {
      this.close();
    }
  }

}
