import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CarListComponent,
  },
  {
    path: 'add-car',
    loadComponent: () =>
      import('./components/car-form/car-form.component').then(
        (m) => m.CarFormComponent
      ),
  },
  {
    path: 'car/:id',
    loadComponent: () =>
      import('./components/car-details/car-details.component').then(
        (m) => m.CarDetailsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
