import { SKUItemDto } from '../dto/create-packing.dto';

export interface Box {
  length: number; // ใช้แทน depth
  width: number;
  height: number;
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
    length: number; // แทน depth
    height: number;
  };
  name?: string;
}
