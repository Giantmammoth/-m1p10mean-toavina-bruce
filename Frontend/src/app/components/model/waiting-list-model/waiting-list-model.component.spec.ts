import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListModelComponent } from './waiting-list-model.component';

describe('WaitingListModelComponent', () => {
  let component: WaitingListModelComponent;
  let fixture: ComponentFixture<WaitingListModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingListModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
