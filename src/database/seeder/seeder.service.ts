// src/database/seeder/seeder.service.ts
import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      const filePath = path.join(__dirname, '../../../seed.sql');
      const sql = fs.readFileSync(filePath, 'utf8');

      await this.dataSource.query(sql);
      this.logger.log('Seed script ejecutado correctamente');
    } catch (error) {
      const duplexRow =
        'duplicate key value violates unique constraint "categories_pkey"';
      const duplexTable = 'relation "category" already exists';
      if (error.message === duplexRow || error.message === duplexTable) {
        this.logger.log('Los datos ya estan cargados al la base de datos');
      } else {
        this.logger.error('Error al ejecutar seed.sql:\n', error.message);
      }
    }
  }
}
