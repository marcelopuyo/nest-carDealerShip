import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid} from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
  ];

  findAll() {
    const brands =  this.brands;

    if (brands.length === 0) {
      throw new NotFoundException(`No hay brands cargadas`);
    }

    return brands
  }
  
  findOne(id: string) {
    const brand = this.brands.find((brand => brand.id === id));

    if (!brand) {
      throw new NotFoundException(`Brand con id ${brand} no encontrada`);
    };

    return brand;
  }
  
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime()
    };

    this.brands.push(brand);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB = {...brandDB, ...updateBrandDto, id };
        brandDB.updatedAt = new Date().getTime();
        return brandDB;
      };

      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  };

}
