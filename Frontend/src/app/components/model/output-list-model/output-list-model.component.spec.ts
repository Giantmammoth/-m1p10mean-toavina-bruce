import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputListModelComponent } from './output-list-model.component';

describe('OutputListModelComponent', () => {
  let component: OutputListModelComponent;
  let fixture: ComponentFixture<OutputListModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputListModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputListModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
