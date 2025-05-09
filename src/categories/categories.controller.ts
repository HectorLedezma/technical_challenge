import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categoria/')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(+id);
  }
}
