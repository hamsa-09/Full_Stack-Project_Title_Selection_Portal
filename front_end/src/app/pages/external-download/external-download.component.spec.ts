import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDownloadComponent } from './external-download.component';

describe('ExternalDownloadComponent', () => {
  let component: ExternalDownloadComponent;
  let fixture: ComponentFixture<ExternalDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
