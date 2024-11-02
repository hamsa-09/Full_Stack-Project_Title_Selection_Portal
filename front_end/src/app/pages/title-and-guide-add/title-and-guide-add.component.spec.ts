import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAndGuideAddComponent } from './title-and-guide-add.component';

describe('TitleAndGuideAddComponent', () => {
  let component: TitleAndGuideAddComponent;
  let fixture: ComponentFixture<TitleAndGuideAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleAndGuideAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleAndGuideAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
