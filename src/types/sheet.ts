import { Product } from "./product";

export type SheetPreset = {
  id: string;
  name: string;
  rows: number;
  cols: number;
};

export type Cell = {
  id: number;
  product?: Product;

  customName?: string;
  customPrice?: string;
};