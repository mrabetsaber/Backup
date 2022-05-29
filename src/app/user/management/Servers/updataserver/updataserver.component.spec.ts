import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataserverComponent } from './updataserver.component';

describe('UpdataserverComponent', () => {
  let component: UpdataserverComponent;
  let fixture: ComponentFixture<UpdataserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdataserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdataserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
