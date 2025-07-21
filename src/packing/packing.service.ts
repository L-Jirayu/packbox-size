import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SKUItemDto } from './dto/create-packing.dto';
import { Box } from './types/packing.types';
import { Packing } from './schemas/packing.schema';
import axios from 'axios';

@Injectable()
export class PackingService {
  constructor(
    @InjectModel(Packing.name)
    private packingModel: Model<Packing>,
  ) {}

  // 🔁 เรียก Python microservice แทนการใช้ JS logic
  async getBoxFromPythonService(skus: SKUItemDto[]): Promise<Box> {
    try {
      const response = await axios.post('http://pythonapi:5000/pack', { skus });
      // ดึง bin แรก (หรือ bin ที่ต้องการ)
      const firstBin = response.data.bins?.[0];
      if (!firstBin) {
        throw new Error('No bins returned from python service');
      }
      return firstBin.size;
    } catch (error) {
      console.error('❌ Error calling Python service:', error.message);
      return { width: 60, height: 60, depth: 60 };
    }
  }

  async storeResult(skus: SKUItemDto[]) {
    const box = await this.getBoxFromPythonService(skus);
    const result = new this.packingModel({
      box: `${box.width}x${box.height}x${box.depth}`,
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

  async remove(id: string): Promise<string> {
    const res = await this.packingModel.findByIdAndDelete(id).exec();
    return res ? 'Deleted' : 'Not Found';
  }
}
