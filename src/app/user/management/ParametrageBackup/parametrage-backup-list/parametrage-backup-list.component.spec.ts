import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageBackupListComponent } from './parametrage-backup-list.component';

describe('ParametrageBackupListComponent', () => {
  let component: ParametrageBackupListComponent;
  let fixture: ComponentFixture<ParametrageBackupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrageBackupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageBackupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
