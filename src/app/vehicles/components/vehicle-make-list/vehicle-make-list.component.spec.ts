import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchComponent } from '../search/search.component';
import { VehicleMakeListComponent } from './vehicle-make-list.component';
import { VehicleService } from '../../services/vehicle.service';
import { MaterialModule } from '../../../shared/material.module';
import { Router } from '@angular/router';

describe('VehicleMakeListComponent', () => {
  let component: VehicleMakeListComponent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMakeListComponent, NoopAnimationsModule, SearchComponent],
      providers: [provideHttpClient(), provideAnimations(), provideMockStore({ initialState: {} }), VehicleService],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    const fixture = TestBed.createComponent(VehicleMakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('VehicleMakeListComponent (HTML)', () => {
  let component: VehicleMakeListComponent;
  let fixture: ComponentFixture<VehicleMakeListComponent>;
  let store: MockStore;
  let router: Router;

  const mockVehicleMakes = [
    { Make_ID: 1, Make_Name: 'Toyota' },
    { Make_ID: 2, Make_Name: 'Ford' },
    { Make_ID: 3, Make_Name: 'Honda' },
    { Make_ID: 4, Make_Name: 'Chevrolet' },
    { Make_ID: 5, Make_Name: 'BMW' },
  ];

  const initialState = {
    vehicles: {
      vehicleMakes: mockVehicleMakes,
      loadingMakes: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMakeListComponent, MaterialModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleMakeListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should display the loading spinner when loadingMakes$ is true', fakeAsync(() => {
    store.setState({
      vehicles: {
        vehicleMakes: [],
        loadingMakes: true,
        error: null,
      },
    });
    fixture.detectChanges();
    tick();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  }));
});
