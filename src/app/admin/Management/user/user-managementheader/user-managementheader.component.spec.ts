import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementheaderComponent } from './user-managementheader.component';

describe('UserManagementheaderComponent', () => {
  let component: UserManagementheaderComponent;
  let fixture: ComponentFixture<UserManagementheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
