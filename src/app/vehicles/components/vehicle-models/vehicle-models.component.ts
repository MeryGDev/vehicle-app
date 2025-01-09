import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VehicleModel } from '../../models/vehicle-model.model';
import { MaterialModule } from '../../../shared/material.module';
import { Observable } from 'rxjs';
import { selectVehicleModels } from '../../../store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-vehicle-models',
  imports: [CommonModule, MaterialModule, ScrollingModule],
  templateUrl: './vehicle-models.component.html',
  styleUrl: './vehicle-models.component.scss',
})
export class VehicleModelsComponent {
  @Input() models: VehicleModel[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() selectedVehicleType: string | null = null;

  imagePath: string = 'assets/images/car-placeholder.jpg';
  rows: VehicleModel[][] = [];
  models$: Observable<VehicleModel[]> = new Observable<VehicleModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.models$ = this.store.pipe(select(selectVehicleModels));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['models'] || changes['selectedVehicleType']) {
      if (this.models && this.models.length > 0) {
        this.rows = this.chunkModels(this.models);
      }
    }
  }

  chunkModels(models: VehicleModel[]): VehicleModel[][] {
    const rows = [];
    for (let i = 0; i < models.length; i += 4) {
      rows.push(models.slice(i, i + 4)); // Divide models into rows of 4
    }
    return rows;
  }

  trackByVehicleModelId(index: number, model: VehicleModel): number {
    return model.Model_ID;
  }
}
