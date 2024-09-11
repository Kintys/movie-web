import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBannerSectionComponent } from './main-banner-section.component';

describe('MainBannerSectionComponent', () => {
  let component: MainBannerSectionComponent;
  let fixture: ComponentFixture<MainBannerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBannerSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainBannerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
