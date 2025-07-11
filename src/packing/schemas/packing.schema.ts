import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackingDocument = Packing & Document;

@Schema()
export class Packing {
  @Prop()
  box: string;

  @Prop({ type: Object })
  dimension: {
    width: number;
    height: number;
    depth: number;
  };

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Array, default: [] })
  skus: any[]; // เก็บ raw object ไปก่อน ถ้าจะ validate จริงจังใช้ class-validator/transform
}

export const PackingSchema = SchemaFactory.createForClass(Packing);
