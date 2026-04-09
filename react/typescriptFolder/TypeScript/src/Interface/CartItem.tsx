import { type IProducto } from "./Producto";

export interface ICartItem extends IProducto {
  cantidad: number;
}