import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleModel } from '../../models/vehicle-model.model';
import { MaterialModule } from '../../../shared/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-models',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vehicle-models.component.html',
  styleUrl: './vehicle-models.component.scss',
})
export class VehicleModelsComponent {
  @Input() models: VehicleModel[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() selectedVehicleType: string | null = null; // Recibe el tipo de vehículo seleccionado

  imagePath: string = 'assets/images/car-placeholder.jpg';

  trackByVehicleModelId(index: number, model: VehicleModel): number {
    return model.Model_ID;
  }

  constructor(private snackBar: MatSnackBar) {}
}
