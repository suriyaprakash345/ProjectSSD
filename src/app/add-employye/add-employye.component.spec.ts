import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployyeComponent } from './add-employye.component';

describe('AddEmployyeComponent', () => {
  let component: AddEmployyeComponent;
  let fixture: ComponentFixture<AddEmployyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployyeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
