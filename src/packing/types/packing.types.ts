import { SKUItemDto } from '../dto/create-packing.dto';

export interface Box {
  width: number;
  height: number;
  depth: number;
}

export interface PackingResult {
  _id: string;
  box: string;
  dimension: Box;
  createdAt: Date;
  skus?: SKUItemDto[]; // เก็บไว้ในระบบ แต่ไม่ต้องส่งออก
}

export interface ItemDimension {
  dimension: {
    width: number;
    height: number;
    depth: number; 
    
  };
  name?: string;
}
