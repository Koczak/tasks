import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  deleteCar(id: string) {
    if (
      confirm(
        'Are you sure you want to delete this car? This action cannot be undone.'
      )
    ) {
      this.carService.deleteCar(id);
    }
  }
}
