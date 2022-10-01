import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBucketListComponent } from './emp-bucket-list.component';

describe('EmpBucketListComponent', () => {
  let component: EmpBucketListComponent;
  let fixture: ComponentFixture<EmpBucketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBucketListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBucketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
