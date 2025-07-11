import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { PackingService } from './packing.service';
import { CreatePackingDto } from './dto/create-packing.dto';
import { BadRequestException } from '@nestjs/common';


@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post('bestbox')
  async getBestBox(@Body() body: CreatePackingDto) {
    const result = await this.packingService.storeResult(body.skus);
    return {
      statusCode: 201,
      message: 'Success',
      data: {
        _id: result._id,
        box: result.box,
        dimension: result.dimension,
        createdAt: result.createdAt,
      },
    };
  }

  @Get()
  async getAll() {
    const results = await this.packingService.findAll();
    return results.map(result => ({
      _id: result._id,
      box: result.box,
      dimension: result.dimension,
      createdAt: result.createdAt,
    }));
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.packingService.findOne(id);
    if (!result) throw new NotFoundException('Packing result not found');
    return {
      statusCode: 200,
      message: 'Success',
      data: {
        _id: result._id,
        box: result.box,
        dimension: result.dimension,
        skus: result.skus, // <--- เพิ่มตรงนี้
        createdAt: result.createdAt,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const status = await this.packingService.remove(id);
    if (status === 'Not Found') throw new NotFoundException('Not Found');
    return {
      statusCode: 200,
      message: 'Deleted',
    };
  }
}
