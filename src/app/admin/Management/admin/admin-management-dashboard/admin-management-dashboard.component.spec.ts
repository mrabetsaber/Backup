import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementDashboardComponent } from './admin-management-dashboard.component';

describe('AdminManagementDashboardComponent', () => {
  let component: AdminManagementDashboardComponent;
  let fixture: ComponentFixture<AdminManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
