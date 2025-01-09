import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VehicleModel } from '../../models/vehicle-model.model';
import { MaterialModule } from '../../../shared/material.module';
import { Observable } from 'rxjs';
import { selectLoadingModels, selectVehicleModels } from '../../../store/selectors';
import { select, Store } from '@ngrx/store';
import { loadVehicleModelsByType } from '../../../store/actions';

@Component({
  selector: 'app-vehicle-models',
  imports: [CommonModule, MaterialModule, ScrollingModule],
  templateUrl: './vehicle-models.component.html',
  styleUrl: './vehicle-models.component.scss',
})
export class VehicleModelsComponent {
  @Input() error: string | null = null;
  @Input() selectedVehicleType: string | null = null;
  @Input() selectedMake: string = '';

  imagePath: string = 'assets/images/car-placeholder.jpg';

  rows: VehicleModel[][] = [];
  models$: Observable<VehicleModel[]> = new Observable();
  loadingModels$: Observable<boolean> = new Observable();

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Solo cargamos los modelos si tenemos tipo de vehículo y marca seleccionados
    if (this.selectedMake && this.selectedVehicleType) {
      this.store.dispatch(
        loadVehicleModelsByType({
          make: this.selectedMake,
          vehicleType: this.selectedVehicleType,
        })
      );
    }
    this.models$ = this.store.pipe(select(selectVehicleModels));
    this.loadingModels$ = this.store.pipe(select(selectLoadingModels));

    // Después de que los modelos estén cargados, los chunkamos en filas de 4
    this.models$.subscribe((models) => {
      if (models && models.length > 0) {
        this.rows = this.chunkModels(models);
      } else {
        this.rows = [];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si se selecciona un tipo de vehículo nuevo, recargamos los modelos
    if (changes['selectedVehicleType']) {
      if (this.selectedVehicleType && this.selectedMake) {
        this.store.dispatch(
          loadVehicleModelsByType({
            make: this.selectedMake,
            vehicleType: this.selectedVehicleType,
          })
        );
      }
    }
  }

  // Función para dividir los modelos en filas de 4
  chunkModels(models: VehicleModel[]): VehicleModel[][] {
    const rows = [];
    for (let i = 0; i < models.length; i += 4) {
      rows.push(models.slice(i, i + 4));
    }
    return rows;
  }

  trackByVehicleModelId(index: number, model: VehicleModel): number {
    return model.Model_ID;
  }
}
