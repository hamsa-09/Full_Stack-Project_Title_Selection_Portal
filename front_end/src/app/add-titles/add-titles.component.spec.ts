import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTitlesComponent } from './add-titles.component';

describe('AddTitlesComponent', () => {
  let component: AddTitlesComponent;
  let fixture: ComponentFixture<AddTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTitlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
