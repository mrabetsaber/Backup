import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageBackupDashboardComponent } from './parametrage-backup-dashboard.component';

describe('ParametrageBackupDashboardComponent', () => {
  let component: ParametrageBackupDashboardComponent;
  let fixture: ComponentFixture<ParametrageBackupDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrageBackupDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageBackupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
