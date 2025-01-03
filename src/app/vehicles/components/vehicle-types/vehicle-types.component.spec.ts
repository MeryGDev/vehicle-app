import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypesComponent } from './vehicle-types.component';

describe('VehicleTypesComponent', () => {
  let component: VehicleTypesComponent;
  let fixture: ComponentFixture<VehicleTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
