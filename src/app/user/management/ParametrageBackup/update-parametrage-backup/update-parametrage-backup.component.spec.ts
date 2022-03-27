import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParametrageBackupComponent } from './update-parametrage-backup.component';

describe('UpdateParametrageBackupComponent', () => {
  let component: UpdateParametrageBackupComponent;
  let fixture: ComponentFixture<UpdateParametrageBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParametrageBackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParametrageBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
