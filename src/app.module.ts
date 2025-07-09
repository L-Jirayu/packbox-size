import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackingModule } from './packing/packing.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'packbox_size',
    }),
    
    PackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
