import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesforceComponent } from './salesforce';

describe('SalesforceComponent', () => {
  let component: SalesforceComponent;
  let fixture: ComponentFixture<SalesforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesforceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesforceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
