import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleType } from '../../models/vehicle-type.model';
import { MaterialModule } from '../../../shared/material.module';
import { loadVehicleModelsByType } from '../../../store/actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoadingModels, selectVehicleModels } from '../../../store/selectors';
import { VehicleModel } from '../../models/vehicle-model.model';

@Component({
  selector: 'app-vehicle-types',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.scss',
})
export class VehicleTypesComponent {
  @Input() types: VehicleType[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() selectedMake: string = '';  // Recibe la marca seleccionada

  @Output() onSelectType: EventEmitter<string> = new EventEmitter();  // Emitir el tipo seleccionado
  loadingModels$: Observable<boolean> = new Observable<boolean>();
  models$: Observable<VehicleModel[]> = new Observable<VehicleModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadingModels$ = this.store.pipe(select(selectLoadingModels));
    this.models$ = this.store.pipe(select(selectVehicleModels))
  }

  selectType(type: VehicleType): void {
    this.onSelectType.emit(type.VehicleTypeName); // Emitimos el tipo seleccionado
    if (this.selectedMake) {
      console.log('Marca seleccionada:', this.selectedMake);
      this.store.dispatch(loadVehicleModelsByType({ make: this.selectedMake, vehicleType: type.VehicleTypeName }));
    }
  }

  get uniqueTypes(): VehicleType[] {
    return Array.from(new Set(this.types.map((a) => a.VehicleTypeName)))
      .map((name) => this.types.find((a) => a.VehicleTypeName === name))
      .filter((type): type is VehicleType => type !== undefined);
  }
}
