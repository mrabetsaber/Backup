import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParametrageBackupComponent } from './add-parametrage-backup.component';

describe('AddParametrageBackupComponent', () => {
  let component: AddParametrageBackupComponent;
  let fixture: ComponentFixture<AddParametrageBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParametrageBackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParametrageBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
