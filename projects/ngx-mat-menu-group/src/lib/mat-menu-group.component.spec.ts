import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuGroupComponent } from './mat-menu-group.component';

describe('MatMenuGroupComponent', () => {
  let component: MatMenuGroupComponent;
  let fixture: ComponentFixture<MatMenuGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatMenuGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
