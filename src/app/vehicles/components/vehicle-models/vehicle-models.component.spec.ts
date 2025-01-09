import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { By } from '@angular/platform-browser';
import { VehicleModelsComponent } from './vehicle-models.component';
import { loadVehicleModelsByType } from '../../../store/actions';
import { VehicleModel } from '../../models/vehicle-model.model';

describe('VehicleModelsComponent', () => {
  let component: VehicleModelsComponent;
  let fixture: ComponentFixture<VehicleModelsComponent>;
  let store: MockStore;

  const initialState = {
    vehicles: {
      vehicleModels: {
        Count: 1,
        Message: 'Success',
        SearchCriteria: 'Sedan',
        Results: [
          {
            Make_ID: 1,
            Make_Name: 'Toyota',
            Model_ID: 101,
            Model_Name: 'Camry',
            VehicleTypeId: 3,
            VehicleTypeName: 'Sedan',
          },
        ],
      },
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleModelsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleModelsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    component.selectedMake = 'Ford';
    component.selectedVehicleType = 'Truck';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadVehicleModelsByType action on ngOnInit', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
    tick(); // Avanza el reloj de pruebas

    expect(dispatchSpy).toHaveBeenCalledWith(
      loadVehicleModelsByType({
        make: 'Ford',
        vehicleType: 'Truck',
      })
    );
  }));

  it('should display loading spinner when models are loading', fakeAsync(() => {
    // Cambia el estado de "loadingModels" a true para simular que está cargando
    store.setState({
      vehicles: {
        vehicleTypes: [{ id: 1, name: 'Sedan' }],
        models: [],
        error: null,
        loadingModels: true,
      },
    });

    fixture.detectChanges();
    tick();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  }));

  it('should display error message if no models are available', fakeAsync(() => {
    store.setState({
      vehicles: {
        vehicleTypes: [],
        models: [],
        error: null,
      },
    });
    fixture.detectChanges();
    tick();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('No hay modelos disponibles para el tipo seleccionado.');
  }));

  it('should display vehicle models when models are loaded', fakeAsync(() => {
    const models: VehicleModel[] = [
      {
        Make_ID: 1,
        Make_Name: 'Toyota',
        Model_ID: 1,
        Model_Name: 'Model X',
        VehicleTypeId: 1,
        VehicleTypeName: 'Sedan',
      },
      {
        Make_ID: 1,
        Make_Name: 'Toyota',
        Model_ID: 2,
        Model_Name: 'Model Y',
        VehicleTypeId: 1,
        VehicleTypeName: 'Sedan',
      },
    ];

    store.setState({
      vehicles: {
        vehicleTypes: [{ id: 1, name: 'Sedan' }],
        models: models,
        error: null,
        loadingModels: false,
      },
    });

    fixture.detectChanges();
    tick();

    // Obtener el componente CdkVirtualScrollViewport
    const viewportDebugElement = fixture.debugElement.query(By.directive(CdkVirtualScrollViewport));
    const viewport = viewportDebugElement.componentInstance as CdkVirtualScrollViewport;

    // Simula el scroll para forzar el renderizado de los elementos
    viewport.scrollToIndex(0);
    fixture.detectChanges();
    tick();

    const modelNames = fixture.nativeElement.querySelectorAll('.vehicle-model-name');
    expect(modelNames.length).toBe(2);
    expect(modelNames[0].textContent).toContain('Model X');
    expect(modelNames[1].textContent).toContain('Model Y');
  }));
});
