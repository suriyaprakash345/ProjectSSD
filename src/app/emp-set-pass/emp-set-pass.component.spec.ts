import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSetPassComponent } from './emp-set-pass.component';

describe('EmpSetPassComponent', () => {
  let component: EmpSetPassComponent;
  let fixture: ComponentFixture<EmpSetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSetPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
