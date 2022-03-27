import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartcomponnentComponent } from './chartcomponnent.component';

describe('ChartcomponnentComponent', () => {
  let component: ChartcomponnentComponent;
  let fixture: ComponentFixture<ChartcomponnentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartcomponnentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartcomponnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
