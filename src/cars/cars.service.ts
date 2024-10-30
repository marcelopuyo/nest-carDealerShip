import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    const cars =  this.cars;

    if (cars.length === 0) {
      throw new NotFoundException(`No hay carros cargados`);
    }

    return cars
  }

  findOneById(id: string) {
    const car = this.cars.find(car => car.id === id);

    if (!car) {
      throw new NotFoundException(`Carro con id ${id} no encontrado`);
    }

    return car
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {id: uuid(), ...createCarDto};
    this.cars.push(newCar);

    return newCar;

  }
}
