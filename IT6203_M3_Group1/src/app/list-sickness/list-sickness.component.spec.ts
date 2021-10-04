import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSicknessComponent } from './list-sickness.component';

describe('ListSicknessComponent', () => {
  let component: ListSicknessComponent;
  let fixture: ComponentFixture<ListSicknessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSicknessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSicknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
