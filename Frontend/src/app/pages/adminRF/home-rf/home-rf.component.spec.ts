import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRFComponent } from './home-rf.component';

describe('HomeRFComponent', () => {
  let component: HomeRFComponent;
  let fixture: ComponentFixture<HomeRFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
