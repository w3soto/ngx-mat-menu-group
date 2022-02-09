import { TestBed } from '@angular/core/testing';
import { MatMenuModule} from "@angular/material/menu";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { NgxMatMenuGroupModule } from "../../../ngx-mat-menu-group/src/lib/mat-menu-group.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatMenuModule,
        MatSlideToggleModule,
        NgxMatMenuGroupModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
