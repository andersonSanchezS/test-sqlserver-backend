import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnsModule } from './turns/turns.module';
import config from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    TurnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
