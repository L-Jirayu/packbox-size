import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdatePackingDto {
  @IsOptional()
  @IsString()
  box?: string;

  @IsOptional()
  @IsObject()
  dimension?: {
    width: number;
    height: number;
    depth: number;
  };

  @IsOptional()
  @IsString()
  id?: string;
}
