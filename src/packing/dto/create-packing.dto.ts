import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsNumber, IsOptional, IsString } from 'class-validator';

export class DimensionDto {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  depth: number;
}

export class SKUItemDto {
  @ValidateNested()
  @Type(() => DimensionDto)
  dimension: DimensionDto;

  @IsOptional()
  @IsString()
  name?: string;
}

export class CreatePackingDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SKUItemDto)
  skus: SKUItemDto[];
}