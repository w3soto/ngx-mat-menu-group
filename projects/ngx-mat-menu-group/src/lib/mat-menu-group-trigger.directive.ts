import { Directive, HostBinding, HostListener, Input, OnInit, Optional } from "@angular/core";
import { MatMenuGroupComponent } from "./mat-menu-group.component";
import { MatMenuGroupsDirective } from "./mat-menu-groups.directive";


@Directive({
  selector: '[ngxMatMenuGroupTriggerFor]',
  exportAs: 'ngxMatMenuGroupTrigger',
  host: {
    class: 'ngx-mat-menu-group-trigger ngx-mat-menu-group-trigger--closed'
  }
})
export class NgxMatMenuGroupTrigger implements OnInit {

  @Input('ngxMatMenuGroupTriggerFor')
  private _menuGroup!: MatMenuGroupComponent;

  @HostBinding('class.ngx-mat-menu-group-trigger--closed')
  private _closed: boolean = true;

  constructor(
    @Optional() private _menuGroupAccordion: MatMenuGroupsDirective,
  ) {
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    this.toggle();
    e.stopPropagation();
    return false;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.code == "Enter" || e.code == "Space") {
      this.toggle();
      e.stopPropagation();
      return false;
    }
    return true;
  }

  ngOnInit() {
    this._closed = this._menuGroup?.closed;
  }

  open() {
    this._menuGroupAccordion?.closeOthers(this);
    this._menuGroup?.open();
    this._closed = this._menuGroup?.closed;
  }

  close() {
    this._menuGroup?.close();
    this._closed = this._menuGroup?.closed;
  }

  toggle() {
    if (this._closed) {
      this.open();
    } else {
      this.close();
    }
  }

}
