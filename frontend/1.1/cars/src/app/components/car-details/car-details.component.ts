import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import {
  Car,
  ServiceRecord,
  ServicePart,
} from '../../interfaces/car.interface';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  services: ServiceRecord[] = [];
  serviceForm: FormGroup;
  showServiceForm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private fb: FormBuilder
  ) {
    this.serviceForm = this.createServiceForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const carId = params['id'];
      this.carService.getCars().subscribe((cars) => {
        this.car = cars.find((c) => c.id === carId) || null;
        if (this.car) {
          this.services = this.carService.getCarServices(carId);
        }
      });
    });
  }

  get sortedServices() {
    return [...this.services].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  createServiceForm(): FormGroup {
    return this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      parts: this.fb.array([]),
      notes: [''],
    });
  }

  get parts() {
    return this.serviceForm.get('parts') as FormArray;
  }

  addPart() {
    const partGroup = this.fb.group({
      name: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
    this.parts.push(partGroup);
  }

  removePart(index: number) {
    this.parts.removeAt(index);
  }

  calculateTotalMaintenanceCost(): string {
    const total = this.services.reduce(
      (sum, service) => sum + service.totalCost,
      0
    );
    return total.toFixed(2);
  }

  toggleServiceForm() {
    this.showServiceForm = !this.showServiceForm;
    if (this.showServiceForm) {
      this.serviceForm.reset({
        date: new Date().toISOString().split('T')[0],
      });
      while (this.parts.length) {
        this.parts.removeAt(0);
      }
      this.addPart();
    }
  }

  addService() {
    if (this.serviceForm.valid && this.car && this.parts.length > 0) {
      const formValue = this.serviceForm.value;
      const totalCost = formValue.parts.reduce(
        (sum: number, part: ServicePart) => sum + part.cost * part.quantity,
        0
      );

      const serviceRecord: Omit<ServiceRecord, 'id'> = {
        carId: this.car.id,
        date: new Date(formValue.date),
        parts: formValue.parts,
        totalCost,
        notes: formValue.notes,
      };

      this.carService.addCarService(serviceRecord);
      this.services = this.carService.getCarServices(this.car.id);
      this.toggleServiceForm();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
