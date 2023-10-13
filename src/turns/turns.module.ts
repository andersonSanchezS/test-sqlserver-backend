import { Module } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { TurnsController } from './turns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenTurns } from './entities/genTurns';

@Module({
  imports: [TypeOrmModule.forFeature([GenTurns])],
  providers: [TurnsService],
  controllers: [TurnsController],
})
export class TurnsModule {}
