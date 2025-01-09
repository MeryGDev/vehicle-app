import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleTypesComponent } from './vehicle-types.component';
import { MaterialModule } from '../../../shared/material.module';

describe('VehicleTypesComponent', () => {
  let component: VehicleTypesComponent;
  let fixture: ComponentFixture<VehicleTypesComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypesComponent, MaterialModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            vehicles: {
              loadingModels: false,
              models: [],
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTypesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display an error message if there are no types or an error exists', () => {
    component.loading = false;
    component.types = [];
    component.error = 'Error al cargar tipos';
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('No se encontraron tipos de vehículos para esta marca.');
  });
});
