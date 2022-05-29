import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailBackupListComponent } from './gmail-backup-list.component';

describe('GmailBackupListComponent', () => {
  let component: GmailBackupListComponent;
  let fixture: ComponentFixture<GmailBackupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailBackupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailBackupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
