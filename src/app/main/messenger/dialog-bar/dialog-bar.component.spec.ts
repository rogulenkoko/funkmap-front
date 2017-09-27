import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBarComponent } from './dialog-bar.component';

describe('DialogBarComponent', () => {
  let component: DialogBarComponent;
  let fixture: ComponentFixture<DialogBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
