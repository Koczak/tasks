export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  registrationNumber?: string;
  createdAt: Date;
}

export interface ServiceRecord {
  id: string;
  carId: string;
  date: Date;
  parts: ServicePart[];
  totalCost: number;
  notes?: string;
}

export interface ServicePart {
  name: string;
  cost: number;
  quantity: number;
}
