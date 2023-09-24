import { Module } from '@nestjs/common';
import { ValoresService } from './valores.service';
import { ValoresController } from './valores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valores } from './entities/valore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Valores])],
  controllers: [ValoresController],
  providers: [ValoresService],
})
export class ValoresModule {}
