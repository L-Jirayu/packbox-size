import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackingModule } from './packing/packing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://root:example@mongo:27017/packbox_size?authSource=admin', {
      dbName: 'packbox_size',
    }),
    
    PackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
