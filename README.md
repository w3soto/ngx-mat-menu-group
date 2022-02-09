# NgxMatMenuGroup

Menu group and accordion component for Angular Material

[![w3soto](https://circleci.com/gh/w3soto/ngx-mat-menu-group.svg?style=svg)](https://circleci.com/gh/w3soto/ngx-mat-menu-group)

[StackBlitz Demo](https://stackblitz.com/edit/angular-ivy-cx4uk3)

## Features
* Key navigation
* Independent or accordion expand/collapse mode
* Support groups in sub-menus

![Screenshot](https://raw.githubusercontent.com/w3soto/ngx-mat-menu-group/master/screenshot.png "Screenshot")

## Installation
```shell
npm -i ngx-mat-menu-group
```

## Example

Fro more details see *projects/demo* application

```typescript
import { NgxMatMenuGroupModule } from "ngx-mat-menu-group";
...

@NgModule({
  imports: [
    ...,
    NgxMatMenuGroupModule,
  ],
  ...
})
class AppModule { ... }

```

Template 
```html
<mat-menu #menu="matMenu">

  <ng-template matMenuContent>
    <button mat-menu-item>Standard menu item 1</button>
    <button mat-menu-item>Standard menu item 2</button>
    
    <div ngxMatMenuGroupAccordion>
      <mat-divider></mat-divider>
      
      <div mat-menu-item [ngxMatMenuGroupTriggerFor]="itemGroup1">
        Menu group trigger 1
      </div>
      <div ngx-mat-menu-group #itemGroup1>
        <button mat-menu-item>Group item 1-1</button>
        <button mat-menu-item>Group item 1-2</button>
        <button mat-menu-item>Group item 1-3</button>
      </div>
      
      <mat-divider></mat-divider>
      
      <div mat-menu-item [ngxMatMenuGroupTriggerFor]="itemGroup2">
        Menu group trigger 2
      </div>
      <div ngx-mat-menu-group #itemGroup2>
        <button mat-menu-item>Group item 2-1</button>
        <button mat-menu-item>Group item 2-2</button>
        <button mat-menu-item>Group item 2-3</button>
      </div>
      
      <mat-divider></mat-divider>
      
      <div mat-menu-item [ngxMatMenuGroupTriggerFor]="itemGroup3">
        Menu group trigger 3
      </div>
      <div ngx-mat-menu-group #itemGroup3>
        <button mat-menu-item>Group item 3-1</button>
        <button mat-menu-item>Group item 3-2</button>
        <button mat-menu-item>Group item 3-3</button>
      </div>
        
      <mat-divider></mat-divider>  
        
    </div>
    
    <button mat-menu-item>Standard menu item 3</button>
    <button mat-menu-item>Standard menu item 4</button>
    
  </ng-template>
  
</mat-menu>
```

## Components

**ngx-mat-menu-group**

| @Output | Event value |
| ------- | ----------- |
| **groupOpened** | void |
| **groupClosed** | void |

## Directives 
 
**ngxMatMenuGroupTriggerFor**

| @Input | Type | Default |
| ------ | ---- | ------- |
| **menuGroup** | NgxMatMenuGroup |  |

| @Output | Event value |
| ------- | ----------- |
| **groupOpened** | void |
| **groupClosed** | void |

**ngxMatMenuGroupAccordion**

| @Input | Type | Default |
| ------ | ---- | ------- |
| **ngxMatMenuGroupAccordion** | boolean | true |

## Limitations

Menu content has to be wrapped into **ng-template matMenuContent** 
```html
<mat-menu #myMenu>
  <ng-template matMenuContent>
    ...
  </ng-template>
</mat-menu>
```
