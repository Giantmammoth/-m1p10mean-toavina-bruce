import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationModelComponent } from './show-information-model.component';

describe('ShowInformationModelComponent', () => {
  let component: ShowInformationModelComponent;
  let fixture: ComponentFixture<ShowInformationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInformationModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInformationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
