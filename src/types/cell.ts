import { Product } from "./product";

export interface Cell {
  id: number;
  product?: Product;
  customName?: string;
  customPrice?: string;
}