import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressListModelComponent } from './in-progress-list-model.component';

describe('InProgressListModelComponent', () => {
  let component: InProgressListModelComponent;
  let fixture: ComponentFixture<InProgressListModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressListModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressListModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
