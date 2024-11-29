import { Injectable } from '@angular/core';
import { Car, ServiceRecord } from '../interfaces/car.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly CARS_KEY = 'cars';
  private readonly SERVICES_KEY = 'carServices';
  private carsSubject = new BehaviorSubject<Car[]>(this.loadCars());

  constructor() {}

  private loadCars(): Car[] {
    try {
      const cars = localStorage.getItem(this.CARS_KEY);
      return cars ? JSON.parse(cars) : [];
    } catch (error) {
      console.error('Error loading cars:', error);
      return [];
    }
  }

  private saveCars(cars: Car[]): void {
    localStorage.setItem(this.CARS_KEY, JSON.stringify(cars));
    this.carsSubject.next(cars);
  }

  getCars(): Observable<Car[]> {
    return this.carsSubject.asObservable();
  }

  addCar(car: Omit<Car, 'id' | 'createdAt'>): void {
    const cars = this.loadCars();
    const newCar: Car = {
      ...car,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    cars.push(newCar);
    this.saveCars(cars);
  }

  deleteCar(id: string): void {
    const cars = this.loadCars().filter((car) => car.id !== id);
    this.saveCars(cars);
    this.deleteCarServices(id);
  }

  getCarServices(carId: string): ServiceRecord[] {
    try {
      const services = localStorage.getItem(this.SERVICES_KEY);
      const allServices: ServiceRecord[] = services ? JSON.parse(services) : [];
      return allServices.filter((service) => service.carId === carId);
    } catch (error) {
      console.error('Error loading services:', error);
      return [];
    }
  }

  addCarService(service: Omit<ServiceRecord, 'id'>): void {
    try {
      const services = localStorage.getItem(this.SERVICES_KEY);
      const allServices: ServiceRecord[] = services ? JSON.parse(services) : [];
      const newService: ServiceRecord = {
        ...service,
        id: crypto.randomUUID(),
      };
      allServices.push(newService);
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(allServices));
    } catch (error) {
      console.error('Error adding service:', error);
    }
  }

  private deleteCarServices(carId: string): void {
    try {
      const services = localStorage.getItem(this.SERVICES_KEY);
      if (services) {
        const allServices: ServiceRecord[] = JSON.parse(services);
        const filteredServices = allServices.filter(
          (service) => service.carId !== carId
        );
        localStorage.setItem(
          this.SERVICES_KEY,
          JSON.stringify(filteredServices)
        );
      }
    } catch (error) {
      console.error('Error deleting services:', error);
    }
  }
}
