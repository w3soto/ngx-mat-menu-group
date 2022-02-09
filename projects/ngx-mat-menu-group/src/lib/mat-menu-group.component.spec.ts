import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";

import { NgxMatMenuGroup } from './mat-menu-group.component';


describe('NgxMatMenuGroup', () => {
  let component: NgxMatMenuGroup;
  let fixture: ComponentFixture<NgxMatMenuGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxMatMenuGroup
      ],
      imports: [
        NoopAnimationsModule,
        MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatMenuGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open', fakeAsync(() => {

    const groupEl = fixture.debugElement.nativeElement;

    spyOn(component.groupOpened, 'emit').and.callThrough();
    spyOn((component as any), '_startAnimation').and.callThrough();
    spyOn((component as any), '_loadMenuItemsState').and.callThrough();

    // OPEN
    component.open();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(component.closed).toBeFalse();
    // should load menu items state
    expect((component as any)._loadMenuItemsState).toHaveBeenCalledTimes(1);
    // should start animation
    expect((component as any)._startAnimation).toHaveBeenCalledOnceWith('open');
    // should emit
    expect(component.groupOpened.emit).toHaveBeenCalledTimes(1);
    // height should be set to auto -> ''
    expect(groupEl.style.height).toEqual('');
    // close class should be removed
    expect(groupEl.classList.contains('ngx-mat-menu-group-closed')).toBeFalse();

  }));

  it('should close', fakeAsync(() => {

    // set default to open
    component.open();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const groupEl = fixture.debugElement.nativeElement;
    spyOn(component.groupClosed, 'emit').and.callThrough();
    spyOn((component as any), '_startAnimation').and.callThrough();
    spyOn((component as any), '_disableMenuItems').and.callThrough();

    // CLOSE
    component.close();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    // should set state to closed
    expect(component.closed).toBeTrue();
    // should disable menu items
    expect((component as any)._disableMenuItems).toHaveBeenCalledTimes(1);
    // should start animation
    expect((component as any)._startAnimation).toHaveBeenCalledOnceWith('close');
    // should emit
    expect(component.groupClosed.emit).toHaveBeenCalledTimes(1);
    // height should be set to zero -> '0px'
    expect(groupEl.style.height).toEqual('0px');
    // close class should be added
    expect(groupEl.classList.contains('ngx-mat-menu-group-closed')).toBeTrue();

    flush();

  }));

});
