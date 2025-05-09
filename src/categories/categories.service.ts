import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async findOne(id: number) {
    let cat = {}; //objeto json donde se guardará el resultado
    try {
      cat = await this.categoryRepository.findOne({ where: { id } });
      if (cat === null) {
        //si la conuslta no da con ninguna fila de la tabla
        //retorna un Status:404 Not Found
        throw new NotFoundException({ error: 'Categoría no encontrada' });
      }
      return cat;
    } catch (error) {
      throw error;
    }
  }
}
