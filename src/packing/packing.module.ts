import { Module } from '@nestjs/common';
import { PackingService } from './packing.service';
import { PackingController } from './packing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Packing, PackingSchema } from './schemas/packing.schema';

@Module({
   imports: [
    MongooseModule.forFeature([{ name: Packing.name, schema: PackingSchema }]),
  ],
  controllers: [PackingController],
  providers: [PackingService],
})
export class PackingModule {}
