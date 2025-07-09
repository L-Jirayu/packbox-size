import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { SKUItemDto } from './dto/create-packing.dto';
import { Box } from './types/packing.types';
import { Packing } from './schemas/packing.schema';

@Injectable()
export class PackingService {
  constructor(
    @InjectModel(Packing.name)
    private packingModel: Model<Packing>,
  ) {}

  private readonly availableBoxes: Box[] = [
    { length: 20, width: 14, height: 6 },
    { length: 25, width: 17, height: 9 },
    { length: 30, width: 20, height: 11 },
    { length: 35, width: 22, height: 14 },
    { length: 40, width: 24, height: 17 },
    { length: 45, width: 30, height: 20 },
    { length: 36, width: 31, height: 26 },
    { length: 45, width: 40, height: 34 },
    { length: 55, width: 45, height: 40 },
    { length: 45, width: 45, height: 30 },
  ];

  getBestBoxFromSKUData(skus: SKUItemDto[], buffer = 1.05): Box {
    const items = skus.map(s => ({
      length: s.dimension.length,
      width: s.dimension.width,
      height: s.dimension.height,
    }));

    const totalVolume = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
    const threshold = totalVolume * buffer;

    const maxL = Math.max(...items.map(i => i.length));
    const maxW = Math.max(...items.map(i => i.width));
    const maxH = Math.max(...items.map(i => i.height));

    const candidate = this.availableBoxes
      .filter(b =>
        b.length >= maxL &&
        b.width >= maxW &&
        b.height >= maxH &&
        b.length * b.width * b.height >= threshold,
      )
      .sort(
        (a, b) => a.length * a.width * a.height - b.length * b.width * b.height,
      )[0];

    return candidate || { length: 60, width: 60, height: 60 };
  }

  async storeResult(skus: SKUItemDto[]) {
    const box = this.getBestBoxFromSKUData(skus);
    const result = new this.packingModel({
      box: `${box.length}x${box.width}x${box.height}`,
      dimension: box,
      skus,
    });
    return result.save();
  }

  async findAll() {
    return this.packingModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return this.packingModel.findById(id).exec();
  }

  async update(id: string, skus: SKUItemDto[]) {
    const box = this.getBestBoxFromSKUData(skus);
    return this.packingModel.findByIdAndUpdate(
      id,
      {
        box: `${box.length}x${box.width}x${box.height}`,
        dimension: box,
        skus,
      },
      { new: true }
    ).exec();
  }

  async remove(id: string): Promise<string> {
    const res = await this.packingModel.findByIdAndDelete(id).exec();
    return res ? 'Deleted' : 'Not Found';
  }
}
