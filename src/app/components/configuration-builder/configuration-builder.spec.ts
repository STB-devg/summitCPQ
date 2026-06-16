import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationBuilderComponent } from './configuration-builder';

describe('ConfigurationBuilderComponent', () => {
  let component: ConfigurationBuilderComponent;
  let fixture: ComponentFixture<ConfigurationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationBuilderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
