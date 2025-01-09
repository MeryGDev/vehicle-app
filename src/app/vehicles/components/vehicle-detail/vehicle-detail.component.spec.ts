import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { vehicleReducer } from '../../../store/reducers';

describe('VehicleDetailComponent', () => {
  let component: VehicleDetailComponent;
  let fixture: ComponentFixture<VehicleDetailComponent>;

  beforeEach(async () => {
    const activatedRouteMock = {
      params: of({ id: '17 CREEK ENTERPRISES' })  // Mockeamos el parámetro 'id' que viene en la URL
    };

    await TestBed.configureTestingModule({
      imports: [
        VehicleDetailComponent,
        StoreModule.forRoot(vehicleReducer)
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }  // Mockeamos ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vehicle details based on route parameter', () => {
    expect(component.make).toBe('17 CREEK ENTERPRISES');
  });
});
