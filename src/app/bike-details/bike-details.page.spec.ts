import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeDetailsPage } from './bike-details.page';

describe('BikeDetailsPage', () => {
  let component: BikeDetailsPage;
  let fixture: ComponentFixture<BikeDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
