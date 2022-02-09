import { NgxMatMenuGroupTrigger } from "./mat-menu-group-trigger.directive";
import { Component, ViewChild } from "@angular/core";
import { NgxMatMenuGroup } from "./mat-menu-group.component";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { By } from "@angular/platform-browser";
import { trigger } from "@angular/animations";

@Component({
  selector: 'test-component',
  template: `
    <button [ngxMatMenuGroupTriggerFor]="group" #trigger="ngxMatMenuGroupTrigger"></button>
    <div ngx-mat-menu-group #group="ngxMatMenuGroup">
      <button mat-menu-item>Item 1</button>
      <button mat-menu-item>Item 2</button>
      <button mat-menu-item>Item 3</button>
    </div>
  `
})
class TestComponent {
  @ViewChild('trigger', {static: true})
  trigger!: NgxMatMenuGroupTrigger;
  @ViewChild('group', {static: true})
  group!: NgxMatMenuGroup;
}

describe('NgxMatMenuGroupTrigger', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatMenuGroupTrigger,
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
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an trigger instance', () => {
    expect(component.trigger).toBeTruthy();
  });

  it('should create an group instance', () => {
    expect(component.group).toBeTruthy();
  });

  it('should throw error if no ngx-mat-menu-group instance is provided', () => {
    // @ts-ignore
    component.trigger.menuGroup = null;
    expect( () => {
      component.trigger.open();
    }).toThrow(new Error('ngxMatMenuGroupTriggerFor: must pass in an ngx-mat-menu-group instance'));
  });

  it('should open', fakeAsync(() => {

    const triggerEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group-trigger'));
    const groupEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group'));

    spyOn(component.trigger.groupOpened, 'emit').and.callThrough();
    spyOn(component.group, 'open').and.callThrough();

    component.trigger.open();
    fixture.detectChanges();

    tick(1000);
    fixture.detectChanges();

    // check state
    expect(component.trigger.closed).toBeFalse();
    // check class
    expect(triggerEl.nativeElement.classList.contains('ngx-mat-menu-group-trigger-closed')).toBeFalse();
    // check groupOpened event
    expect(component.trigger.groupOpened.emit).toHaveBeenCalledTimes(1);

    // check if group is opened
    expect(component.group.closed).toBeFalse();
    expect(component.group.open).toHaveBeenCalledTimes(1);
    expect(groupEl.nativeElement.classList.contains('ngx-mat-menu-group-closed')).toBeFalse();

  }));

  it('should close', fakeAsync(() => {

    // initial
    component.trigger.open();
    fixture.detectChanges();

    tick(1000);
    fixture.detectChanges();

    const triggerEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group-trigger'));
    const groupEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group'));

    spyOn(component.trigger.groupClosed, 'emit').and.callThrough();
    spyOn(component.group, 'close').and.callThrough();

    component.trigger.close();
    fixture.detectChanges();

    tick(1000);
    fixture.detectChanges();

    // check state
    expect(component.trigger.closed).toBeTrue();
    // check class
    expect(triggerEl.nativeElement.classList.contains('ngx-mat-menu-group-trigger-closed')).toBeTrue();
    // check groupClosed event
    expect(component.trigger.groupClosed.emit).toHaveBeenCalledTimes(1);

    // check if group is closed
    expect(component.group.closed).toBeTrue();
    expect(component.group.close).toHaveBeenCalledTimes(1);
    expect(groupEl.nativeElement.classList.contains('ngx-mat-menu-group-closed')).toBeTrue();
  }));

  it('should toggle', fakeAsync(() => {

    spyOn(component.trigger, 'open').and.callThrough();
    spyOn(component.trigger, 'close').and.callThrough();

    component.trigger.toggle();
    component.trigger.toggle();
    component.trigger.toggle();
    component.trigger.toggle();

    expect(component.trigger.open).toHaveBeenCalledTimes(2);
    expect(component.trigger.close).toHaveBeenCalledTimes(2);

  }));

  it('should toggle on click event', fakeAsync(() => {
    const triggerEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group-trigger'));
    spyOn(component.trigger, 'toggle').and.callThrough();

    triggerEl.nativeElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.trigger.toggle).toHaveBeenCalledTimes(1);
  }));

  it('should toggle on key enter event', () => {
    const triggerEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group-trigger'));
    spyOn(component.trigger, 'toggle').and.callThrough();

    triggerEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {code: 'Enter'}));
    fixture.detectChanges();

    expect(component.trigger.toggle).toHaveBeenCalledTimes(1);
  });

  it('should toggle on key space event', () => {
    const triggerEl = fixture.debugElement.query(By.css('.ngx-mat-menu-group-trigger'));
    spyOn(component.trigger, 'toggle').and.callThrough();

    triggerEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {code: 'Space'}));
    fixture.detectChanges();

    expect(component.trigger.toggle).toHaveBeenCalledTimes(1);
  });
});
